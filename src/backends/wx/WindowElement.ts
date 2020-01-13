import * as wx from "node-wx-napi";
import { BaseElement } from ".";

export class WindowElement extends BaseElement {
  constructor() {
    super();
    this.element = new wx.WxFrame();
  }
  resizeEvent(func: (width: number, height: number) => void) {
    this.element.OnResize(func);
  }
  getClosed(): boolean {
    return this.element.getClosed();
  }
}
