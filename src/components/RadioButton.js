import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class RadioButton extends DesktopComponent {
  eventParameter = { onSelected: 'selected' };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiRadioButtons();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode(this);
    this.element.selected = this.props.selected; // we need to set selected after the children are rendered (set selected after text is appended)
  }
}

RadioButton.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  selected: PropTypes.number,
  onSelected: PropTypes.func,
  ...universalPropTypes,
};

RadioButton.defaultProps = {
  enabled: true,
  visible: true,
  selected: -1,
  onSelected: () => {},
  ...universalDefaultProps,
};

RadioButton.Item = class Item extends DesktopComponent {
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

RadioButton.Item.PropTypes = {
  children: PropTypes.string.isRequired,
};

RadioButton.Item.defaultProps = {
  children: '',
};

export default RadioButton;
