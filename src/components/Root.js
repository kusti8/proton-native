import libui from 'libui-node';
import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';

// This creates the document instance
class Root extends DesktopComponent {
  constructor() {
    super();
    libui.startLoop();
    libui.Ui.onShouldQuit(() => {
      libui.stopLoop();
    });
  }
  render() {
    this.renderChildNode();
  }
}

export default Root;
