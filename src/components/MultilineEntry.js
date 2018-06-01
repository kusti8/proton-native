import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class MultilineEntry extends DesktopComponent {
  eventParameter = { onChanged: 'text' };
  childName = 'text';

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiMultilineEntry();
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

MultilineEntry.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.string,
};

MultilineEntry.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  readOnly: false,
  onChange: () => {},
  children: '',
};

export default MultilineEntry;
