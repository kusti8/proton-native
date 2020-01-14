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

    switch (mode) {
      case "cover":
        this.pixElement.scaled(
          width,
          height,
          qt.AspectRatioMode.KeepAspectRatioByExpanding
        );
        break;
      case "contain":
        this.pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
        break;
      case "stretch":
        this.pixElement.scaled(
          width,
          height,
          qt.AspectRatioMode.IgnoreAspectRatio
        );
        break;
      case "center":
        this.element.setAlignment(qt.Alignment.AlignCenter);
        this.pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
        break;
      case "repeat":
        this.pixElement.scaledTile(width, height);
        break;
      default:
        console.log(`unexpected mode = ${mode}`);
        break;
    }
    this.element.setPixmap(this.pixElement);
    this.element.show();
    this.element.adjustSize();
  }

  isNull(): boolean {
    return this.pixElement.isNull();
  }
}
