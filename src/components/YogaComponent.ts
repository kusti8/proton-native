import * as yoga from "yoga-layout-prebuilt";
import { getYogaValueTransformer } from "../utils/yogaHelper";
import { BaseElement, WindowElement } from "../backends/qt";

export declare class Layout {
  readonly left: number;
  readonly right: number;
  readonly top: number;
  readonly bottom: number;
  readonly width: number;
  readonly height: number;
  constructor(
    left: number,
    right: number,
    top: number,
    bottom: number,
    width: number,
    height: number
  );

  fromJs(
    expose: (
      left: number,
      right: number,
      top: number,
      bottom: number,
      width: number,
      height: number
    ) => any
  ): void;

  toString(): string;
}

export const YogaComponent = (
  element: BaseElement,
  postApplyYoga: ((layout: Layout) => void) | null | undefined = null,
  standardMeasure: boolean = false
) => {
  const config = yoga.Config.create();
  //config.setPrintTreeFlag(true);
  const node = yoga.Node.createWithConfig(config);
  const f: { f: () => void } = { f: () => {} };
  const oldLayout = {};

  const applyYogaStyle = (style: React.CSSProperties) => {
    for (const key in style) {
      const transformer = getYogaValueTransformer(key);
      const setFn = (node as any)[transformer.functionName];
      if (setFn) {
        const value = (style as any)[key] as any;
        const args = transformer.transform(value);
        setFn.apply(node, args);
      }
    }
  };

  const applyYoga = (
    root: { w: number; h: number } | null,
    func: () => void
  ) => {
    f.f = func;
    if (root) {
      node.calculateLayout(root.w, root.h);
    }
    const layout = node.getComputedLayout();
    const simpleLayout = {
      width: layout.width,
      height: layout.height,
      left: layout.left,
      top: layout.top
    };
    let shouldUpdate = false;
    for (const prop in simpleLayout) {
      if ((simpleLayout as any)[prop] !== (oldLayout as any)[prop]) {
        shouldUpdate = true;
      }
    }
    if (!shouldUpdate) return;

    if (element instanceof WindowElement) {
      return;
    }

    element!.resize(layout.width, layout.height);
    element!.move(layout.left, layout.top);

    if (postApplyYoga) {
      postApplyYoga(layout);
    }

    Object.assign(oldLayout, simpleLayout);
  };

  if (standardMeasure) {
    const measure = () => {
      return {
        height: element.minSize().h,
        width: element.minSize().w
      };
    };

    node.setMeasureFunc(() => measure());
  }

  return {
    applyYogaStyle,
    applyYoga,
    node,
    f
  };
};
