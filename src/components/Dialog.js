import { CURRENT_WINDOW } from './Window';
import libui from 'libui-node';

const getCurrentDialog = {
  Open() {
    return libui.UiDialogs.openFile(CURRENT_WINDOW);
  },
  Save() {
    return libui.UiDialogs.saveFile(CURRENT_WINDOW);
  },
  Message({ title, description }) {
    return libui.UiDialogs.msgBox(
      CURRENT_WINDOW,
      title,
      options
    );
  },
  Error({ title, description }) {
    return libui.UiDialogs.msgBoxError(
      CURRENT_WINDOW,
      title,
      description
    );
  }
}

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

  getCurrentDialog[type](options);
}
