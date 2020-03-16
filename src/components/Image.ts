import propChecker from "../utils/propChecker";
import { Container } from "./Container";
import * as PropTypes from "prop-types";
import propsUpdater from "../utils/propsUpdater";
import convertStyleSheet from "../utils/convertStyleSheet";
import { YogaComponent, Layout } from "./YogaComponent";
import fetch from "node-fetch";
import { getBackend } from "../backends/index";
import { Component } from "./Base";

type ResizeMode = "cover" | "contain" | "stretch" | "repeat" | "center";

interface PixSize {
  width: number;
  height: number;
  resizeMode: ResizeMode;
}

interface ImageSource {
  uri: string;
  method: any;
  body: any;
  headers: any;
}

interface ImageStyle extends React.CSSProperties {
  resizeMode: ResizeMode;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      IMAGE: Props;
    }
  }
}

export interface Props {
  style?: React.CSSProperties;
  onResponderGrant?: () => void;
  onResponderRelease?: () => void;
  resizeMode?: ResizeMode;
  source?: ImageSource;
}

export default (p: Props) => {
  const propTypes = {
    style: PropTypes.object,
    onResponderGrant: PropTypes.func,
    onResponderRelease: PropTypes.func,
    resizeMode: PropTypes.oneOf([
      "cover",
      "contain",
      "stretch",
      "repeat",
      "center"
    ]),
    source: PropTypes.object
  };
  const defaultProps = {
    style: {},
    onResponderGrant: () => {},
    onResponderRelease: () => {}
  };

  const ImageElement = getBackend()["ImageElement"];
  const element = new ImageElement();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "Image");

  const resizeMode = { r: props.resizeMode || "stretch" };
  const pixSize: PixSize = { width: 0, height: 0, resizeMode: resizeMode.r };

  const yogaProps = YogaComponent(element, (layout: Layout) => {
    pixSize.width = layout.width;
    pixSize.height = layout.height;
    pixSize.resizeMode = resizeMode.r;
    if (!element.isNull())
      element.scaleImage(layout.width, layout.height, resizeMode.r);
  });

  const handlers = {
    onResponderGrant: props.onResponderGrant,
    onResponderRelease: props.onResponderRelease
  };

  element.mousePressEvent(() => {
    if (handlers.onResponderGrant) {
      handlers.onResponderGrant();
    }
  });

  element.mouseReleaseEvent(() => {
    if (handlers.onResponderRelease) {
      handlers.onResponderRelease();
    }
  });

  const containerProps = Container(
    (child: Component) => {
      child.element.setParent(element);
      if (child.node) {
        yogaProps.node.insertChild(child.node, yogaProps.node.getChildCount());
      }
    },
    (child: Component) => {
      child.element.del();
      if (child.node) {
        yogaProps.node.removeChild(child.node);
      }
    },
    (child: Component, i: number) => {
      child.element.setParent(element);
      if (child.node) {
        yogaProps.node.insertChild(child.node, i);
      }
    }
  );

  const updateProps = propsUpdater(
    [handlers, "onResponderGrant", "onResponderRelease"],
    {
      style: (style: ImageStyle) => {
        if (style.resizeMode) {
          resizeMode.r = style.resizeMode;
        } else {
          resizeMode.r = "cover";
        }
        element.setStyleSheet(style);
        yogaProps.applyYogaStyle(style);
      },
      resizeMode: (r: ResizeMode) => {
        resizeMode.r = r;
      },
      source: (source: ImageSource) => {
        if (source.uri) {
          // need to figure out what width and height work with, and also work with arrays
          if (
            source.uri.startsWith("http://") ||
            source.uri.startsWith("https://") ||
            source.uri.startsWith("ftp://")
          ) {
            fetch(source.uri, {
              method: source.method || "GET",
              body: source.body,
              headers: source.headers
            })
              .then(out => out.buffer())
              .then(out => {
                element.setFromData(out);
                element.scaleImage(
                  pixSize.width,
                  pixSize.height,
                  pixSize.resizeMode
                );
              })
              .catch(err => console.log(err));
          } else {
            element.setFromUri(source.uri);
            element.scaleImage(
              pixSize.width,
              pixSize.height,
              pixSize.resizeMode
            );
          }
        }
      }
    }
  );

  updateProps(props);

  return {
    ...containerProps,
    ...yogaProps,
    element,
    updateProps,
    resizeMode
  };
};
