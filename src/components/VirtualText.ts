import propChecker from "../utils/propChecker";
import propsUpdater from "../utils/propsUpdater";
import * as PropTypes from "prop-types";
import { TextFuncs } from "./TextFuncs";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      VIRTUALTEXT: React.PropsWithChildren<Props>;
    }
  }
}

export interface Props {
  style?: React.CSSProperties;
}

export default (p: Props) => {
  const propTypes = {
    style: PropTypes.object
  };
  const defaultProps = {
    style: {}
  };

  const element = {};

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "Text");

  let styleProp = props.style;

  const updateProps = propsUpdater({
    style: (style: React.CSSProperties) => {
      styleProp = style;
    }
  });

  const textProps = TextFuncs(() => {}, styleProp || {});

  updateProps(props);

  return {
    ...textProps,
    element,
    updateProps,
    type: "fullText"
  };
};
