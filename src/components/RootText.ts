import propChecker from "../utils/propChecker";
import propsUpdater from "../utils/propsUpdater";
import * as PropTypes from "prop-types";
import { TextFuncs } from "./TextFuncs";
import { YogaComponent } from "./YogaComponent";
import { getBackend } from '../backends/index';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ROOTTEXT: React.PropsWithChildren<Props>;
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

  const TextElement = getBackend()["TextElement"]
  const element = new TextElement();

  let props = { ...p };
  props = propChecker(props, propTypes, defaultProps, "Text");

  const styleProp = { s: props.style };

  const yogaProps = YogaComponent(element, undefined, true);

  const updateProps = propsUpdater({
    style: (style: React.CSSProperties) => {
      styleProp.s = style;
      if (style.textAlign) {
        // TODO: Need to translate to Qt text align
      }
      yogaProps.applyYogaStyle(style);
    }
  });

  const textProps = TextFuncs((text: string) => {
    element.setText(text);
    yogaProps.node.markDirty();
    yogaProps.f.f && yogaProps.f.f();
  }, styleProp.s || {});

  updateProps(props);

  return {
    ...textProps,
    ...yogaProps,
    element,
    updateProps,
    type: "fullText"
  };
};
