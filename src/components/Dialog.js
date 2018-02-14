import { CURRENT_WINDOW } from './Window';
import libui from 'libui-node';

export default function Dialog(type, options) {
  if (!CURRENT_WINDOW) {
    return;
  }
  if (typeof options !== 'undefined') {
    if (typeof options.title === 'undefined') {
      options.title = '';
    }
    if (typeof options.description === 'undefined') {
      options.description = '';
    }
  }

  if (type == 'Open') {
    return libui.UiDialogs.openFile(CURRENT_WINDOW);
  } else if (type == 'Save') {
    return libui.UiDialogs.saveFile(CURRENT_WINDOW);
  } else if (type == 'Message') {
    libui.UiDialogs.msgBox(CURRENT_WINDOW, options.title, options.description);
  } else if (type == 'Error') {
    libui.UiDialogs.msgBoxError(
      CURRENT_WINDOW,
      options.title,
      options.description
    );
  }
}
