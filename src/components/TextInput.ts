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
      TEXTINPUT: Props
    }
  }
}

export interface Props {
  style?: React.CSSProperties;
  onChangeText?: (text: string) => void;
  value?: string;
  multiline?: boolean;
}

export default (p: Props) => {
  const propTypes = {
    style: PropTypes.object,
    onChangeText: PropTypes.func,
    value: PropTypes.string,
    multiline: PropTypes.bool
  };
  const defaultProps = {
    style: {},
    onChangeText: () => {},
    value: "",
    multiline: false
  };

  const TextInputElement = getBackend()["TextInputElement"];
  const element = new TextInputElement(p.multiline);

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "TextInput");

  const yogaProps = YogaComponent(element, undefined, true);

  const handlers = {
    onChangeText: props.onChangeText
  };

  element.textChangedEvent((text: string) => {
    if (handlers.onChangeText) {
      handlers.onChangeText(text);
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

  const updateProps = propsUpdater([handlers, "onChangeText"], {
    style: (style: React.CSSProperties) => {
      element.setStyleSheet(style);
      yogaProps.applyYogaStyle(style);
    },
    value: (value: string) => {
      element.setText(value);
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
