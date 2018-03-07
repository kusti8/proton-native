import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import {
  ITEM,
  CHECK,
  QUIT,
  PREFERENCES,
  ABOUT,
  SEPARATOR
} from '../constants/types';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class MenuBar extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = new libui.UiMenu(this.props.label);
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode(this);
  }
}

MenuBar.PropTypes = {
  ...universalPropTypes,
  label: PropTypes.string,
};

MenuBar.defaultProps = {
  ...universalDefaultProps,
  label: '',
};

MenuBar.Item = class Item extends DesktopComponent {
  eventParameter = { onClicked: 'checked' };
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.element = {};
  }

  update() {
    // noop
    // no element
  }

  render(parent) {
    this.addParent(parent);
    this.initialProps(this.props); // we can only set props after they have been created in addParent
    this.renderChildNode();
  }
};

MenuBar.Item.PropTypes = {
  children: PropTypes.string,
  checked: PropTypes.bool,
  type: PropTypes.oneOf([
    CHECK,
    QUIT,
    ABOUT,
    PREFERENCES,
    SEPARATOR,
    ITEM,
  ]),
  onClick: PropTypes.func,
  ...universalPropTypes,
};

MenuBar.Item.defaultProps = {
  children: '',
  checked: false,
  type: ITEM,
  onClick: () => {},
  ...universalDefaultProps,
};

export default MenuBar;
