import * as qt from "node-qt-napi";
import { BaseElement } from "./BaseElement";

export class TextElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QLabel();
  }
  
  setText(text: string) {
    this.element.setText(text);
  }
}
