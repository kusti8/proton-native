// From Vuido tests, with modifications
const libui = {};

libui.classFuncs = {
  UiWindow: {
    setChild: jest.fn().mockImplementation(child => {}),
    show: jest.fn(),
    close: jest.fn(),
    onClosing: jest.fn().mockImplementation(handler => {
      handler();
    }),
    onContentSizeChanged: jest.fn().mockImplementation(handler => {
      handler();
    }),
    fullscreen: false,
    margined: false,
    borderless: false,
    contentSize: {
      h: 500,
      w: 500,
    },
  },
  UiControl: {
    visible: true,
    enabled: true,
    destroy: jest.fn(),
  },
  UiLabel: {
    text: '',
    setParent: jest.fn(),
  },
};

libui.UiWindow = jest.fn().mockImplementation((title, width, height, menu) => {
  return libui.classFuncs.UiWindow;
});

libui.UiControl = jest.fn().mockImplementation(() => {
  return libui.classFuncs.UiControl;
});

libui.UiBox = class extends libui.UiControl {
  constructor() {
    super();
    this.padded = false;
    this.children = [];
  }

  append(control, stretchy) {
    this.children.push(control);
  }

  deleteAt(index) {
    if (index < 0 || index >= this.children.length)
      throw new RangeError('Invalid control index');
    this.children.splice(index, 1);
  }
};

libui.UiHorizontalBox = class extends libui.UiBox {};

libui.UiVerticalBox = class extends libui.UiBox {};

libui.UiForm = class extends libui.UiControl {
  constructor() {
    super();
    this.padded = false;
    this.children = [];
  }

  append(label, control, stretchy) {
    this.children.push(control);
  }

  deleteAt(index) {
    if (index < 0 || index >= this.children.length)
      throw new RangeError('Invalid control index');
    this.children.splice(index, 1);
  }
};

libui.UiGroup = class extends libui.UiControl {
  constructor() {
    super();
    this.title = '';
    this.margined = false;
  }

  setChild(control) {}
};

libui.UiTab = class extends libui.UiControl {
  constructor() {
    super();
    this.children = [];
  }

  append(label, control) {
    this.children.push(control);
  }

  deleteAt(index) {
    if (index < 0 || index >= this.children.length)
      throw new RangeError('Invalid control index');
    this.children.splice(index, 1);
  }

  numPages() {
    return this.children.length;
  }

  setMargined(index, margined) {}
};

libui.UiButton = class extends libui.UiControl {
  constructor() {
    super();
    this.text = '';
  }

  onClicked(handler) {}
};

libui.UiLabel = jest.fn().mockImplementation(() => {
  return { ...libui.classFuncs.UiControl, ...libui.classFuncs.UiLabel };
});

libui.UiEntryBase = class extends libui.UiControl {
  constructor() {
    super();
    this.text = '';
    this.readOnly = false;
  }

  onChanged(handler) {}
};

libui.UiEntry = class extends libui.UiEntryBase {};

libui.UiPasswordEntry = class extends libui.UiEntryBase {};

libui.UiSearchEntry = class extends libui.UiEntryBase {};

libui.UiCheckbox = class extends libui.UiControl {
  constructor() {
    super();
    this.text = '';
    this.checked = false;
  }

  onToggled(handler) {}
};

libui.UiColorButton = class extends libui.UiControl {
  constructor() {
    super();
    this.color = null;
  }

  onChanged(handler) {}
};

libui.UiEditableCombobox = class extends libui.UiControl {
  constructor() {
    super();
    this.items = [];
    this.text = '';
  }

  append(item) {
    this.items.push(item);
  }

  onChanged(handler) {}
};

libui.UiCombobox = class extends libui.UiControl {
  constructor() {
    super();
    this.items = [];
    this.selected = 0;
  }

  append(item) {
    this.items.push(item);
  }

  onSelected(handler) {}
};

libui.UiProgressBar = class extends libui.UiControl {
  constructor() {
    super();
    this.value = 0;
  }
};

libui.UiRadioButtons = class extends libui.UiControl {
  constructor() {
    super();
    this.items = [];
    this.selected = 0;
  }

  append(item) {
    this.items.push(item);
  }

  onSelected(handler) {}
};

libui.UiVerticalSeparator = class extends libui.UiControl {};

libui.UiHorizontalSeparator = class extends libui.UiControl {};

libui.UiSlider = class extends libui.UiControl {
  constructor(min, max) {
    super();
    this.min = min;
    this.max = max;
    this.value = 0;
  }

  onChanged(handler) {}
};

libui.UiSpinbox = class extends libui.UiControl {
  constructor(min, max) {
    super();
    this.min = min;
    this.max = max;
    this.value = 0;
  }

  onChanged(handler) {}
};

libui.UiMultilineEntry = class extends libui.UiControl {
  constructor() {
    super();
    this.text = '';
    this.readOnly = false;
  }

  onChanged(handler) {}
};

libui.UiArea = class extends libui.UiControl {
  constructor(
    drawCb,
    mouseEventCb,
    mouseCrossedCb,
    dragBrokenCb,
    keyEventCb,
    width,
    heigth
  ) {
    super();
  }

  setSize(width, height) {}

  queueRedrawAll() {}
};

libui.Color = class {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
};

libui.Size = class {
  constructor(width, height) {
    this.w = width;
    this.h = height;
  }
};

libui.DrawStrokeParams = class {
  constructor() {
    this.thickness = 0;
  }
};

libui.startLoop = jest.fn();

libui.stopLoop = jest.fn();

libui.UiDialogs = {
  msgBox(parent, title, description) {},

  msgBoxError(parent, title, description) {},

  openFile(parent) {},

  saveFile(parent) {},
};

libui.Ui = {
  onShouldQuit(func) {},
};

module.exports = libui;
module.exports.defa;
