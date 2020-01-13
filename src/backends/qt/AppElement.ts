import * as qt from "node-qt-napi";

export class AppElement {
  element: any;
  constructor() {
    this.element = new qt.QApplication();
  }

  runLoop() {
    this.element.sendPostedEvents();
    this.element.processEvents();
  }
}
