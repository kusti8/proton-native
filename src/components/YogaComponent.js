import yoga, { Node } from 'yoga-layout-prebuilt';
import { getYogaValueTransformer } from '../utils/yogaHelper';

export const YogaComponent = (element, postApplyYoga, standardMeasure) => {
  const node = Node.create();

  const applyYogaStyle = style => {
    for (const key in style) {
      const transformer = getYogaValueTransformer(key);
      const setFn = node[transformer.functionName];
      if (setFn) {
        const value = style[key];
        const args = transformer.transform(value);
        setFn.apply(node, args);
      }
    }
  };

  const applyYoga = root => {
    if (root) {
      node.calculateLayout(root.w, root.h, yoga.DIRECTION_LTR);
    }
    const layout = node.getComputedLayout();
    element.resize(layout.width, layout.height);
    element.move(layout.left, layout.top);
    if (postApplyYoga) {
      postApplyYoga(layout);
    }
  };

  if (standardMeasure) {
    const measure = (width, widthMode, height, heightMode) => {
      console.log(element, element.height());
      if (widthMode === yoga.MEASURE_MODE_EXACTLY) {
        return { height: element.height() }; // TODO: is this the right measurement function?
      }

      if (widthMode === yoga.MEASURE_MODE_AT_MOST) {
        return {
          height: element.height(),
          width: Math.min(width, element.width()),
        };
      }

      return {};
    };

    node.setMeasureFunc((...args) => measure(...args));
  }

  return {
    applyYogaStyle,
    applyYoga,
    node,
  };
};
