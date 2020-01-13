import propChecker from "../utils/propChecker";
import { Container } from "./Container";
import * as PropTypes from "prop-types";
import propsUpdater from "../utils/propsUpdater";
import convertStyleSheet from "../utils/convertStyleSheet";
import { YogaComponent } from "./YogaComponent";
import { getBackend } from "../backends/index";

interface Props {
  style: React.CSSProperties;
  onResponderGrant: () => void;
  onResponderRelease: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      VIEW: any;
    }
  }
}

const propTypes = {
  style: PropTypes.object,
  onResponderGrant: PropTypes.func,
  onResponderRelease: PropTypes.func
};

const defaultProps = {
  style: {},
  onResponderGrant: () => {},
  onResponderRelease: () => {}
};

export default (p: Props) => {
  const ViewElement = getBackend()["ViewElement"];
  const element = new ViewElement();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "View");

  const yogaProps = YogaComponent(element);

  const handlers = {
    onResponderGrant: props.onResponderGrant,
    onResponderRelease: props.onResponderRelease
  };

  element.mousePressEvent(() => {
    handlers.onResponderGrant();
  });

  element.mouseReleaseEvent(() => {
    handlers.onResponderRelease();
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

  const updateProps = propsUpdater(
    [handlers, "onResponderGrant", "onResponderRelease"],
    {
      style: (style: React.CSSProperties) => {
        element.setStyleSheet(style);
        yogaProps.applyYogaStyle(style);
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
