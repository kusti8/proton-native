import * as qt from "node-qt-napi";
import convertStyleSheet from "../../utils/convertStyleSheet";

interface Size {
  w: number;
  h: number;
}

export function desktopSize(): Size {
  return qt.desktopSize();
}

export abstract class BaseElement {
  element: any;
  mousePressEvent(func: () => void) {
    this.element.mousePressEvent(func);
  }

  mouseReleaseEvent(func: () => void) {
    this.element.mouseReleaseEvent(func);
  }

  setStyleSheet(obj: object) {
    this.element.setStyleSheet(convertStyleSheet(obj));
  }

  setParent(elem: BaseElement) {
    //console.log("Set parent", this.element, elem.element);
    this.element.setParent(elem.element);
  }

  del() {
    this.element.del();
  }

  resize(width: number, height: number) {
    this.element.resize(width, height);
  }

  move(left: number, top: number) {
    this.element.move(left, top);
  }

  minSize(): Size {
    return this.element.minimumSizeHint();
  }

  show() {
    this.element.show();
  }

  close() {
    this.element.close();
  }

  width(): number {
    return this.element.width();
  }

  height(): number {
    return this.element.height();
  }
}
