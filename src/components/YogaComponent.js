import yoga, { Node } from 'yoga-layout';
import { getYogaValueTransformer } from '../utils/yogaHelper';

export const YogaComponent = element => {
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
    console.log(element, layout);
    element.resize(layout.width, layout.height);
    element.move(layout.left, layout.top);
  };

  return {
    applyYogaStyle,
    applyYoga,
    node,
  };
};
