import * as wx from "node-wx-napi";

export class AppElement {
  element: any;
  constructor() {
    this.element = new wx.WxApp();
  }

  runLoop() {
    this.element.loop();
  }
}
