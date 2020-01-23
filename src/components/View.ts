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
      VIEW: React.PropsWithChildren<Props>;
    }
  }
}

type a = {
  text?: string
} & {
  text: string
}

export interface Props {
  style?: React.CSSProperties;
  onResponderGrant?: () => void;
  onResponderRelease?: () => void;
}

export default (p: Props) => {
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
