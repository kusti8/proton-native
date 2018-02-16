import libui from 'libui-node';
import { clearInterval } from 'timers';

var STARTED = false;
var timeout = null;

export function start() {
  if (STARTED) {
    return;
  } else {
    STARTED = true;
  }
  libui.Ui.mainSteps();
  timeout = setInterval(() => libui.Ui.mainStep(1), 16);
}

export function stop() {
  if (!STARTED) {
    return;
  } else {
    STARTED = false;
  }
  if (timeout) {
    clearInterval(timeout);
  }
}
