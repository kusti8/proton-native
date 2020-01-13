import * as qt from "node-qt-napi";
import { BaseElement } from "./BaseElement";

export class ImageElement extends BaseElement {
  pixElement: any;
  
  constructor() {
    super();
    this.element = new qt.QLabel();
    this.element.setScaledContents(false);
    this.pixElement = new qt.QPixmap();
  }

  setFromData(data: Buffer) {
    this.pixElement.loadFromData(data);
    this.element.setPixmap(this.pixElement);
  }

  setFromUri(uri: string) {
    this.pixElement.load(uri);
    this.element.setPixmap(this.pixElement);
  }

  scaleImage(
    width: number,
    height: number,
    mode: "cover" | "contain" | "stretch" | "center" | "repeat"
  ) {
    this.element.setAlignment(
      qt.Alignment.AlignLeft | qt.Alignment.AlignVCenter
    );
    if (mode == "cover") {
      this.pixElement.scaled(
        width,
        height,
        qt.AspectRatioMode.KeepAspectRatioByExpanding
      );
    } else if (mode == "contain") {
      this.pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
    } else if (mode == "stretch") {
      this.pixElement.scaled(
        width,
        height,
        qt.AspectRatioMode.IgnoreAspectRatio
      );
    } else if (mode == "center") {
      this.element.setAlignment(qt.Alignment.AlignCenter);
      this.pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
    } else if (mode == "repeat") {
      this.pixElement.scaledTile(width, height);
    }
    this.element.setPixmap(this.pixElement);
    this.element.show();
    this.element.adjustSize();
  }

  isNull(): boolean {
    return this.pixElement.isNull();
  }
}
