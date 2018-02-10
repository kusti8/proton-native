var libui = require('libui-node');

libui.Ui.init();
libui.startLoop();

var win = new libui.UiWindow('Example window', 640, 480, true);

var radio = new libui.UiEditableCombobox();
radio.append('A');
radio.append('B');
radio.onChanged(() => {});

win.setChild(radio);

win.onClosing(function() {
  libui.stopLoop();
});

win.show();
