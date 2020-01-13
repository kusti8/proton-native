import * as qt from "node-qt-napi";
import { BaseElement } from "./BaseElement";

export class TextInputElement extends BaseElement {
  constructor(multi: boolean) {
    super();
    this.element = multi ? new qt.QPlainTextEdit() : new qt.QLineEdit();
  }

  textChangedEvent(func: (newText: string) => void) {
    this.element.textChangedEvent(func);
  }

  setText(text: string) {
    this.element.setText(text);
  }
}
