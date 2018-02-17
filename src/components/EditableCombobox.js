import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class EditableCombobox extends DesktopComponent {
  eventParameter = { onChange: 'text' };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiEditableCombobox();
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode(this);
    this.element.text = this.props.text; // we need to set selected after the children are rendered (set selected after text is appended)
  }
}

EditableCombobox.PropTypes = {
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  text: PropTypes.string,
  onChange: PropTypes.func,
  ...universalPropTypes,
};

EditableCombobox.defaultProps = {
  enabled: true,
  visible: true,
  text: '',
  onChange: () => {},
  ...universalDefaultProps,
};

EditableCombobox.Item = class Item extends DesktopComponent {
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

EditableCombobox.Item.PropTypes = {
  children: PropTypes.string.isRequired,
};

EditableCombobox.Item.defaultProps = {
  children: '',
};

export default EditableCombobox;
