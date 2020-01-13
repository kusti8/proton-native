import * as qt from "node-qt-napi";
import { BaseElement } from "./BaseElement";

export class ButtonElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QPushButton();
  }

  buttonReleasedEvent(func: () => void) {
    this.element.buttonReleasedEvent(func);
  }

  setText(text: string) {
    this.element.setText(text);
  }
}
