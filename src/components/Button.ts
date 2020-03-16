import propChecker from "../utils/propChecker";
import { Container } from "./Container";
import * as PropTypes from "prop-types";
import propsUpdater from "../utils/propsUpdater";
import convertStyleSheet from "../utils/convertStyleSheet";
import { YogaComponent } from "./YogaComponent";
import { getBackend } from "../backends/index";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      BUTTON: React.PropsWithChildren<Props>;
    }
  }
}

export interface Props {
  style?: React.CSSProperties;
  onPress?: () => void;
  title?: string;
}

export default (p: Props) => {
  const propTypes = {
    style: PropTypes.object,
    onPress: PropTypes.func,
    title: PropTypes.string
  };
  const defaultProps = {
    style: {},
    onPress: () => {},
    title: "Button"
  };

  const ButtonElement = getBackend()["ButtonElement"];
  const element = new ButtonElement();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "TextInput");

  const yogaProps = YogaComponent(element, undefined, true);

  const handlers = {
    onPress: props.onPress
  };

  element.buttonReleasedEvent(() => {
    if (handlers.onPress) {
      handlers.onPress();
    }
  });

  const containerProps = Container(
    child => {
      if (child.type === "text")
        throw new Error(
          "Button takes no children. If you are trying to set the title, use the title prop."
        );

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

  const updateProps = propsUpdater([handlers, "onPress"], {
    style: (style: React.CSSProperties) => {
      element.setStyleSheet(style);
      yogaProps.applyYogaStyle(style);
    },
    title: (title: string) => {
      element.setText(title);
    }
  });

  updateProps(props);

  return {
    ...containerProps,
    ...yogaProps,
    element,
    updateProps
  };
};
