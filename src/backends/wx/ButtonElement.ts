import * as wx from "node-wx-napi";
import { BaseElement } from ".";

export class ButtonElement extends BaseElement {
  constructor() {
    super();
    this.records = [];
    this.element = this.makeRecords([
      "Show",
      "SetSize",
      "GetSize",
      "SetLoc",
      "SetBackgroundColour",
      "SetLabel",
      "OnPress"
    ]);
  }
  setParent(obj: BaseElement) {
    if (!this.checkFakeParent(obj)) {
      this.element = new wx.WxButton(obj.element);
      this.applyRecords();
    }
  }

  buttonReleasedEvent(func: () => void) {
    this.element.OnPress(func);
  }

  setText(text: string) {
    this.element.SetLabel(text);
  }
}
