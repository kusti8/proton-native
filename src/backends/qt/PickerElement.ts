import * as qt from "node-qt-napi";
import { BaseElement } from "./BaseElement";

export class PickerElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QComboBox();
  }

  activatedEvent(func: (text: string) => void) {
    this.element.activatedEvent(func);
  }

  addItem(label: string) {
    this.element.addItem(label);
  }

  removeItem(index: number) {
    this.element.removeItem(index);
  }

  insertItem(index: number, label: string) {
    this.element.insertItem(index, label);
  }

  setCurrentText(label: string) {
    this.element.setCurrentText(label);
  }

  currentIndex(): number {
    return this.element.currentIndex();
  }
}
