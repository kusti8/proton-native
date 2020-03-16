import propChecker from "../utils/propChecker";
import { Container } from "./Container";
import propsUpdater from "../utils/propsUpdater";
import { ROOT_NODE } from "../render";
import * as PropTypes from "prop-types";
import convertStyleSheet from "../utils/convertStyleSheet";
import { YogaComponent } from "./YogaComponent";
import { getBackend } from "../backends/index";
import * as yoga from "yoga-layout-prebuilt";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      WINDOW: React.PropsWithChildren<Props>;
    }
  }
}

export interface Props {
  style?: React.CSSProperties;
  onResize?: (size: { w: number; h: number }) => void;
  onMove?: (pos: { x: number; y: number }) => void;
}

export default (p: Props) => {
  const propTypes = {
    style: PropTypes.object,
    onResize: PropTypes.func
  };
  const defaultProps = {
    style: {},
    onResize: () => {}
  };

  const backend = getBackend();
  const WindowElement = backend["WindowElement"];
  const desktopSize = backend["desktopSize"];
  const element = new WindowElement();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "Window");

  const yogaProps = YogaComponent(element);

  const handlers = {
    onResize: props.onResize,
    onMove: props.onMove
  };

  element.resizeEvent((w: number, h: number) => {
    ROOT_NODE.afterCommit(ROOT_NODE);
    if (handlers.onResize) {
      handlers.onResize({ w, h });
    }
  });

  element.moveEvent((x: number, y: number) => {
    if (handlers.onMove) {
      handlers.onMove({ x, y });
    }
  });

  const percentToSize = (
    width: number | string | undefined,
    height: number | string | undefined
  ): { w: number; h: number } => {
    let newWidth = width;
    let newHeight = height;
    if (typeof width == "string" && width[width.length - 1] == "%") {
      newWidth = desktopSize().w * (parseInt(width, 10) / 100.0);
    }
    if (typeof height == "string" && height[height.length - 1] == "%") {
      newHeight = desktopSize().h * (parseInt(height, 10) / 100.0);
    }
    return { w: newWidth as number, h: newHeight as number };
  };

  const updateProps = propsUpdater([handlers, "onResize"], {
    style: (style: React.CSSProperties) => {
      const width = style.width;
      const height = style.height;
      delete style.width; // cause we don't want to resize with yoga, only with our pipeline
      delete style.height;
      element.setStyleSheet(style);
      yogaProps.applyYogaStyle(style);
      const size = percentToSize(width, height);
      //console.log("My size", size, width, height);
      if (size.h && size.w) {
        element.resize(size.w, size.h);
      } else if (size.w) {
        element.resize(size.w, element.height());
      } else if (size.h) {
        element.resize(element.width(), size.h);
      }
    }
  });

  const containerProps = Container(
    child => {
      child.element.setParent(element);
      if (child.node) {
        yogaProps.node.insertChild(child.node, yogaProps.node.getChildCount());
      }
    },
    child => {
      child.element.del();
      if (child.node) {
        yogaProps.node.removeChild(child.node);
      }
    },
    (child, i) => {
      child.element.setParent(element);
      if (child.node) {
        yogaProps.node.insertChild(child.node, i);
      }
    }
  );

  updateProps(props);

  return {
    ...containerProps,
    ...yogaProps,
    element,
    updateProps
  };
};
