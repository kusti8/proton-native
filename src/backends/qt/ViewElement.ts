import * as qt from "node-qt-napi";
import { BaseElement } from "./BaseElement";

export class ViewElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QWidget();
  }
}
