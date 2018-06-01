import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Combobox extends DesktopComponent {
  eventParameter = { onSelected: 'selected' };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiCombobox();
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode(this);
    this.element.selected = this.props.selected; // we need to set selected after the children are rendered (set selected after text is appended)
  }
}

Combobox.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  selected: PropTypes.number,
  onSelect: PropTypes.func,
};

Combobox.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  selected: -1,
  onSelect: () => {},
};

Combobox.Item = class Item extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.element = {};
    this.setDefaults(props);
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
};

Combobox.Item.propTypes = {
  children: PropTypes.string.isRequired,
};

Combobox.Item.defaultProps = {
  children: '',
};

export default Combobox;
