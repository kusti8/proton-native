import libui from 'libui-node';
import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';

import PropTypes from 'prop-types';

class App extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.element = {};
    this.setDefaults(props);
  }

  render() {
    libui.Ui.onShouldQuit(() => {
      this.props.onShouldQuit();
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
