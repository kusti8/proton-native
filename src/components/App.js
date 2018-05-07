import libui from 'libui-node';
import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';

import PropTypes from 'prop-types';
import { disconnectDevtools } from '../devtools';

class App extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.element = {};
    this.setDefaults(props);
  }

  update(oldProps, newProps) {
    if (newProps.onShouldQuit !== oldProps.onShouldQuit) {
      libui.Ui.onShouldQuit(() => {
        this.newProps.onShouldQuit();
        libui.stopLoop();
      });
    }
  }

  render() {
    libui.Ui.onShouldQuit(() => {
      this.props.onShouldQuit();
      disconnectDevtools();
      libui.stopLoop();
    });
    this.renderChildNode(this);
  }
}

App.PropTypes = {
  onShouldQuit: PropTypes.func,
};

App.defaultProps = {
  onShouldQuit: () => {},
};

export default App;
