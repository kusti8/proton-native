import yoga, { Node } from 'yoga-layout-prebuilt';
import { getYogaValueTransformer } from '../utils/yogaHelper';

export const YogaComponent = (element, postApplyYoga, standardMeasure) => {
  const config = yoga.Config.create();
  //config.setPrintTreeFlag(true);
  const node = Node.createWithConfig(config);
  const f = {};
  const oldLayout = {};

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

  const applyYoga = (root, func) => {
    f.f = func;
    if (root) {
      node.calculateLayout(root.w, root.h);
    }
    const layout = node.getComputedLayout();
    const simpleLayout = {
      width: layout.width,
      height: layout.height,
      left: layout.left,
      top: layout.top,
    };
    let shouldUpdate = false;
    for (const prop in simpleLayout) {
      if (simpleLayout[prop] !== oldLayout[prop]) {
        shouldUpdate = true;
      }
    }
    if (!shouldUpdate) return;
    element.resize(layout.width, layout.height);
    element.move(layout.left, layout.top);
    if (postApplyYoga) {
      postApplyYoga(layout);
    }

    Object.assign(oldLayout, simpleLayout);
  };

  if (standardMeasure) {
    const measure = (width, widthMode, height, heightMode) => {
      return {
        height: element.minimumSizeHint().h,
        width: element.minimumSizeHint().w,
      };
    };

    node.setMeasureFunc((...args) => measure(...args));
  }

  return {
    applyYogaStyle,
    applyYoga,
    node,
    f,
  };
};
