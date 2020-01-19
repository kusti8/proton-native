import { BaseElement } from "../backends/qt";
import { YogaNode } from "yoga-layout-prebuilt";

export interface Component {
  element: BaseElement;
  node?: YogaNode;
  applyYoga?: (root: { w: number; h: number } | null, func: () => void) => void;
  parent: Component;
  children?: Component[];
  updateProps: (payload: object) => void;
  appendChild?: (child: Component) => void;
  removeChild?: (child: Component) => void;
  insertChild?: (child: Component, beforeChild: Component) => void;
}
