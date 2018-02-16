var libui = require('libui-node');

libui.Ui.init();

var win = new libui.UiWindow('Example window', 640, 480, true);
var font = new libui.UiFontButton();
font.onChanged(function() {
  console.log(font.getFont());
});
win.setChild(font);
win.onClosing(function() {
  //libui.stopLoop();
});

win.show();

libui.Ui.mainSteps()

while (true) {
  libui.Ui.mainStep(1)
}