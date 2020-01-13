import * as wx from "node-wx-napi";
import * as Color from "color";

interface Size {
  w: number;
  h: number;
}

export function desktopSize(): Size {
  return wx.desktopSize();
}

export abstract class BaseElement {
  element: any;
  records: any;

  makeRecords(funcs: string[]) {
    const out: any = {
      FAKE: true
    };
    for (let func of funcs) {
      out[func] = (...args: any[]) =>
        this.records.push({
          f: (...args: any[]) => this.element[func](...args),
          a: args
        });
    }
    return out;
  }

  applyRecords() {
    for (let i = 0; i < this.records.length; i++) {
      this.records[i].f(...this.records[i].a);
    }
  }

  checkFakeParent(obj: BaseElement) {
    if (obj.element.FAKE) {
      obj.records.push({
        f: (...args: any[]) => (this as any).setParent(...args),
        a: [obj]
      })
      return true;
    }
    return false;
  }

  mousePressEvent(func: () => void) {
    //noop
    console.warn("MousePressEvent noop");
    //this.element.mousePressEvent(func);
  }

  mouseReleaseEvent(func: () => void) {
    //noop
    console.warn("MouseReleaseEvent noop");
    //this.element.mouseReleaseEvent(func);
  }

  setStyleSheet(obj: any) {
    if ("backgroundColor" in obj) {
      const color = Color(obj.backgroundColor);
      this.element.SetBackgroundColour(
        color.rgb().red(),
        color.rgb().green(),
        color.rgb().blue()
      );
    }
    //this.element.setStyleSheet(obj);
  }

  //   del() {
  //     this.element.del();
  //   }

  resize(width: number, height: number) {
    this.element.SetSize(width, height);
  }

  move(left: number, top: number) {
    this.element.SetLoc(left, top);
  }

  minSize(): Size {
    return this.element.GetBestSize();
  }

  show() {
    this.element.Show(true);
  }

  close() {
    this.element.Close();
  }

  width(): number {
    return this.element.GetSize().w;
  }
  
  height(): number {
    return this.element.GetSize().h;
  }
}

// export class ImageElement extends BaseElement {
//   pixElement: any;
//   constructor() {
//     super();
//     this.element = new qt.QLabel();
//     this.element.setScaledContents(false);
//     this.pixElement = new qt.QPixmap();
//   }

//   setFromData(data: Buffer) {
//     this.pixElement.loadFromData(data);
//     this.element.setPixmap(this.pixElement);
//   }

//   setFromUri(uri: string) {
//     this.pixElement.load(uri);
//     this.element.setPixmap(this.pixElement);
//   }

//   scaleImage(
//     width: number,
//     height: number,
//     mode: "cover" | "contain" | "stretch" | "center" | "repeat"
//   ) {
//     this.element.setAlignment(
//       qt.Alignment.AlignLeft | qt.Alignment.AlignVCenter
//     );
//     if (mode == "cover") {
//       this.pixElement.scaled(
//         width,
//         height,
//         qt.AspectRatioMode.KeepAspectRatioByExpanding
//       );
//     } else if (mode == "contain") {
//       this.pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
//     } else if (mode == "stretch") {
//       this.pixElement.scaled(
//         width,
//         height,
//         qt.AspectRatioMode.IgnoreAspectRatio
//       );
//     } else if (mode == "center") {
//       this.element.setAlignment(qt.Alignment.AlignCenter);
//       this.pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
//     } else if (mode == "repeat") {
//       this.pixElement.scaledTile(width, height);
//     }
//     this.element.setPixmap(this.pixElement);
//     this.element.show();
//     this.element.adjustSize();
//   }

//   isNull(): boolean {
//     return this.pixElement.isNull();
//   }
// }


// export class PickerElement extends BaseElement {
//   constructor() {
//     super();
//     this.element = new qt.QComboBox();
//   }

//   activatedEvent(func: (text: string) => void) {
//     this.element.activatedEvent(func);
//   }

//   addItem(label: string) {
//     this.element.addItem(label);
//   }

//   removeItem(index: number) {
//     this.element.removeItem(index);
//   }

//   insertItem(index: number, label: string) {
//     this.element.insertItem(index, label);
//   }

//   setCurrentText(label: string) {
//     this.element.setCurrentText(label);
//   }
//   currentIndex(): number {
//     return this.element.currentIndex();
//   }
// }


// export class TextElement extends BaseElement {
//   constructor() {
//     super();
//     this.element = new qt.QLabel();
//   }
//   setText(text: string) {
//     this.element.setText(text);
//   }
// }

// export class TextInputElement extends BaseElement {
//   constructor(multi: boolean) {
//     super();
//     this.element = multi ? new qt.QPlainTextEdit() : new qt.QLineEdit();
//   }

//   textChangedEvent(func: (newText: string) => void) {
//     this.element.textChangedEvent(func);
//   }

//   setText(text: string) {
//     this.element.setText(text);
//   }
// }
