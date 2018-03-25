import {
  Tab,
  Form,
  Grid,
  Combobox,
  RadioButton,
  EditableCombobox,
  MenuBar,
  View,
} from './';
import { Menu } from '../';
import {
  ITEM,
  CHECK,
  QUIT,
  PREFERENCES,
  ABOUT,
  SEPARATOR,
} from '../constants/types';
import PropTypes from 'prop-types';

const functionMappings = {
  onChange: 'onChanged',
  onClose: 'onClosing',
  onClick: 'onClicked',
  onToggle: 'onToggled',
  onSelect: 'onSelected',
  onContentSizeChange: 'onContentSizeChanged',
};

class DesktopComponent {
  constructor(root, props) {
    this.children = [];
  }

  setDefaults(props) {
    for (let prop in this.constructor.defaultProps) {
      if (!(prop in props) || typeof props[prop] === 'undefined') {
        // children can exist, but be undefined
        this.props[prop] = this.constructor.defaultProps[prop];
      }
    }
    PropTypes.checkPropTypes(
      this.constructor.PropTypes,
      this.props,
      'prop',
      this.constructor.name
    );
  }

  exists(a) {
    return typeof a !== 'undefined';
  }

  convertStyle() {
    if (this.props.style) {
      if ('width' in this.props.style) {
        this.width = this.props.style.width;
      }
      if ('height' in this.props.style) {
        this.height = this.props.style.height;
      }
    }
  }

  appendChild(child) {
    // add a child to the list to be rendered
    this.children.push(child);
  }

  removeChild(child) {
    // remove it, and destroy it
    if (this.exists(this.element.setChild)) {
      // if it can only have one child, we don't need to "de-render" it
    } else if (this.exists(this.element.deleteAt)) {
      // if it can have multiple ex. VerticalBox
      this.element.deleteAt(this.children.indexOf(child));
      child.element.destroy();
    }
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  renderChildNode(parent) {
    // render the children
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'object') {
        this.children[i].render(parent);
      }
    }
  }

  addParentAppend(parent) {
    //console.log("Appending child", parent)
    // append to parent. Can be overriden
    const stretchy = this.props.stretchy;
    if (parent instanceof Form) {
      // we have a form
      parent.element.append(this.props.label, this.element, stretchy);
    } else if (parent instanceof Tab) {
      // we have a tab
      parent.element.append(this.props.label, this.element);
      const index = parent.children.indexOf(this);
      const margined = this.props.margined;
      parent.element.setMargined(index, margined);
    } else if (parent instanceof Grid) {
      parent.element.append(
        this.element,
        this.props.column,
        this.props.row,
        this.props.span.x,
        this.props.span.y,
        this.props.expand.h,
        this.props.align.h,
        this.props.expand.v,
        this.props.align.v
      );
    } else if (
      parent instanceof Combobox ||
      parent instanceof RadioButton ||
      parent instanceof EditableCombobox
    ) {
      // we assume we are a ComboBox.Item, and just append the child
      parent.element.append(this.props.children);
    } else if (parent instanceof MenuBar) {
      if (this.props.type === ITEM) {
        this.element = parent.element.appendItem(this.props.children);
      } else if (this.props.type === CHECK) {
        this.element = parent.element.appendCheckItem(this.props.children);
      } else if (this.props.type === QUIT) {
        this.element = parent.element.appendQuitItem();
      } else if (this.props.type === PREFERENCES) {
        this.element = parent.element.appendPreferencesItem();
      } else if (this.props.type === ABOUT) {
        this.element = parent.element.appendAboutItem();
      } else if (this.props.type === SEPARATOR) {
        parent.element.appendSeparator();
      }
    } else if (this instanceof Menu) {
      // we don't need to setChild with a menu
    } else if (parent instanceof View) {
      // the parent View component handles all placing
    } else {
      parent.element.append(this.element, stretchy);
    }
  }

  addParent(parent) {
    // add itself to the parent
    if (this.exists(parent.element.setChild)) {
      parent.element.setChild(this.element);
    } else if (
      this.exists(parent.element.append) ||
      this.exists(parent.element.appendItem)
    ) {
      this.addParentAppend(parent); // append itself to the parent
    }
  }

  update(oldProps, newProps) {
    // update all things, split into props, events, and children
    for (let prop in newProps) {
      // normal props
      if (oldProps[prop] !== newProps[prop]) {
        if (typeof newProps[prop] === 'function') {
          const translatedProp = functionMappings[prop]; // translate React function names in libui names
          if (typeof this.eventParameter[translatedProp] === 'function') {
            // if we don't have a translatedProperty, then we use a function, so handle that
            this.element[translatedProp](() =>
              newProps[prop](this.eventParameter[translatedProp]())
            );
          } else if (this.eventParameter[translatedProp] !== '') {
            this.element[translatedProp](() =>
              newProps[prop](this.element[this.eventParameter[translatedProp]])
            );
          } else {
            this.element[translatedProp](newProps[prop]);
          }
        } else if (prop == 'children') {
          if (this.exists(this.childName)) {
            // prevent stray children from crashing program (like App component)
            this.element[this.childName] = newProps[prop];
          }
        } else {
          if (prop !== 'selected') {
            this.element[prop] = newProps[prop];
          }
        }
      }
    }
  }

  initialProps(props) {
    // same, but don't check for oldProps vs newProps, just set them
    for (let prop in props) {
      // normal props
      if (typeof props[prop] === 'function') {
        const translatedProp = functionMappings[prop]; // translate React function names in libui names
        if (typeof this.eventParameter[translatedProp] === 'function') {
          // if we don't have a property, then we use a function, so handle that
          this.element[translatedProp](() =>
            props[prop](this.eventParameter[translatedProp]())
          );
        } else if (this.eventParameter[translatedProp] !== '') {
          this.element[translatedProp](() =>
            props[prop](this.element[this.eventParameter[translatedProp]])
          );
        } else {
          this.element[translatedProp](props[prop]);
        }
      } else if (prop == 'children') {
        if (this.exists(this.childName)) {
          // prevent stray children from crashing program (like App component)
          this.element[this.childName] = props[prop];
        }
      } else {
        if (prop !== 'selected') {
          this.element[prop] = props[prop];
        }
      }
    }
  }
}

export const universalPropTypes = {
  stretchy: PropTypes.bool,
  label: PropTypes.string,
  column: PropTypes.number,
  row: PropTypes.number,
  span: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  expand: PropTypes.shape({
    h: PropTypes.bool,
    v: PropTypes.bool,
  }),
  align: PropTypes.shape({
    h: PropTypes.bool,
    v: PropTypes.bool,
  }),
};

export const universalDefaultProps = {
  stretchy: true,
  label: '',
  column: 0,
  row: 0,
  span: {
    x: 1,
    y: 1,
  },
  expand: {
    h: true,
    v: true,
  },
  align: {
    h: true,
    v: true,
  },
};

export default DesktopComponent;
