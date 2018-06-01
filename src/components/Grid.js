import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Grid extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiGrid();
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode(this);
  }
}

Grid.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  padded: PropTypes.bool,
};

Grid.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  padded: false,
};

export default Grid;
