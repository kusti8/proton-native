import * as qt from "node-qt-napi";
import { BaseElement } from "./BaseElement";


export class WindowElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QMainWindow();
  }

  resizeEvent(func: (width: number, height: number) => void) {
    this.element.resizeEvent(func);
  }
  
  getClosed(): boolean {
    return this.element.getClosed();
  }
}
