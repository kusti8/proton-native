import propChecker from "../utils/propChecker";
import { Container } from "./Container";
import * as PropTypes from "prop-types";
import propsUpdater from "../utils/propsUpdater";
import convertStyleSheet from "../utils/convertStyleSheet";
import { YogaComponent } from "./YogaComponent";
import { getBackend } from "../backends/index";

interface Point {
  x: number;
  y: number;
}

interface MouseMoveEvent {
  point: Point;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      VIEW: React.PropsWithChildren<Props>;
    }
  }
}

type a = {
  text?: string;
} & {
  text: string;
};

export interface Props {
  style?: React.CSSProperties;
  onResponderGrant?: () => void;
  onResponderRelease?: () => void;
  onMouseMove?: (event: MouseMoveEvent) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default (p: Props) => {
  const propTypes = {
    style: PropTypes.object,
    onResponderGrant: PropTypes.func,
    onResponderRelease: PropTypes.func,
    onMouseMove: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };
  const defaultProps = {
    style: {},
    onResponderGrant: () => {},
    onResponderRelease: () => {},
    onMouseMove: (event: MouseMoveEvent) => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {}
  };

  const ViewElement = getBackend()["ViewElement"];
  const element = new ViewElement();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "View");

  const yogaProps = YogaComponent(element);

  const handlers = {
    onResponderGrant: props.onResponderGrant,
    onResponderRelease: props.onResponderRelease,
    onMouseMove: props.onMouseMove,
    onMouseEnter: props.onMouseEnter,
    onMouseLeave: props.onMouseLeave
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

  element.mouseMoveEvent((x: number, y: number) => {
    handlers.onMouseMove!({ point: { x, y } });
  });

  element.enterEvent(() => {
    handlers.onMouseEnter!();
  });

  element.leaveEvent(() => {
    handlers.onMouseLeave!();
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
    [
      handlers,
      "onResponderGrant",
      "onResponderRelease",
      "onMouseEnter",
      "onMouseLeave"
    ],
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
