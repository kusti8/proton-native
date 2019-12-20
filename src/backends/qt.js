import qt from 'node-qt-napi';

export function desktopSize() {
  return qt.desktopSize();
}

class BaseElement {
  mousePressEvent(func) {
    this.element.mousePressEvent(func);
  }
  mouseReleaseEvent(func) {
    this.element.mouseReleaseEvent(func);
  }
  setStyleSheet(obj) {
    this.element.setStyleSheet(obj);
  }
  setParent(elem) {
    //console.log("Set parent", this.element, elem.element);
    this.element.setParent(elem.element);
  }
  del() {
    this.element.del();
  }
  resize(width, height) {
    this.element.resize(width, height);
  }
  move(left, top) {
    this.element.move(left, top);
  }
  minSize() {
    return this.element.minimumSizeHint();
  }
  show() {
    this.element.show();
  }
  close() {
    this.element.close();
  }
  width() {
    return this.element.width();
  }
  height() {
    return this.element.height();
  }
}

export class ImageElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QLabel();
    this.element.setScaledContents(false);
    this.pixElement = new qt.QPixmap();
  }

  setFromData(data) {
    this.pixElement.loadFromData(data);
    this.element.setPixmap(this.pixElement);
  }

  setFromUri(uri) {
    this.pixElement.load(uri);
    this.element.setPixmap(this.pixElement);
  }

  scaleImage(width, height, mode) {
    this.element.setAlignment(
      qt.Alignment.AlignLeft | qt.Alignment.AlignVCenter
    );
    if (mode == 'cover') {
      this.pixElement.scaled(
        width,
        height,
        qt.AspectRatioMode.KeepAspectRatioByExpanding
      );
    } else if (mode == 'contain') {
      this.pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
    } else if (mode == 'stretch') {
      this.pixElement.scaled(
        width,
        height,
        qt.AspectRatioMode.IgnoreAspectRatio
      );
    } else if (mode == 'center') {
      this.element.setAlignment(qt.Alignment.AlignCenter);
      this.pixElement.scaled(width, height, qt.AspectRatioMode.KeepAspectRatio);
    } else if (mode == 'repeat') {
      this.pixElement.scaledTile(width, height);
    }
    this.element.setPixmap(this.pixElement);
    this.element.show();
    this.element.adjustSize();
  }

  isNull() {
    return this.pixElement.isNull();
  }
}

export class WindowElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QMainWindow();
  }
  resizeEvent(func) {
    this.element.resizeEvent(func);
  }
  getClosed() {
    return this.element.getClosed();
  }
}

export class ViewElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QWidget();
  }
}

export class PickerElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QComboBox();
  }

  activatedEvent(func) {
    return this.element.activatedEvent(func);
  }

  addItem(label) {
    this.element.addItem(label);
  }

  removeItem(index) {
    this.element.removeItem(index);
  }

  insertItem(index, label) {
    this.element.insertItem(index, label);
  }

  setCurrentText(label) {
    this.element.setCurrentText(label);
  }
  currentIndex() {
    return this.element.currentIndex();
  }
}

export class AppElement {
  constructor() {
    this.element = new qt.QApplication();
  }

  runLoop() {
    this.element.sendPostedEvents();
    this.element.processEvents();
  }
}

export class TextElement extends BaseElement {
  constructor() {
    super();
    this.element = new qt.QLabel();
  }
  setText(text) {
    this.element.setText(text);
  }
}

export class TextInputElement extends BaseElement {
  constructor(multi) {
    super();
    this.element = multi ? new qt.QPlainTextEdit() : new qt.QLineEdit();
  }

  textChangedEvent(func) {
    this.element.textChangedEvent(func);
  }

  setText(text) {
    this.element.setText(text);
  }
}
