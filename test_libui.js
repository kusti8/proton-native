var libui = require('libui-node');

libui.Ui.init();
libui.startLoop();

var win = new libui.UiWindow('Example window', 640, 480, true);

win.onClosing(function() {
  libui.stopLoop();
});

win.show();
