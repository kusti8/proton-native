import * as wx from "node-wx-napi";
import { BaseElement } from ".";

export class ViewElement extends BaseElement {
  constructor() {
    super();
    this.records = [];
    this.element = this.makeRecords([
      "Show",
      "SetSize",
      "GetSize",
      "SetLoc",
      "SetBackgroundColour"
    ]);
  }
  setParent(obj: BaseElement) {
    if (!this.checkFakeParent(obj)) {
      this.element = new wx.WxPanel(obj.element);
      this.applyRecords();
    }
  }
}
