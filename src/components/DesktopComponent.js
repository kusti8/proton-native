import {
  Tab,
  Form,
  Grid,
  Combobox,
  RadioButton,
  EditableCombobox,
  MenuBar,
  Group,
  Window,
  Slider,
  Root,
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
import libui from 'libui-node';
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

  checkSingleChild(props) {
    if (this instanceof Window || this instanceof Group) {
      if (props.children && Array.isArray(props.children)) {
        // we have multiple children
        throw 'Window and Group only take one child!';
      }
    }
  }

  setDefaults(props) {
    this.checkSingleChild(props); // check for more than one child in Window and Group
    for (let prop in this.constructor.defaultProps) {
      if (!(prop in props) || typeof props[prop] === 'undefined') {
        // children can exist, but be undefined
        this.props[prop] = this.constructor.defaultProps[prop];
      }
    }
    PropTypes.checkPropTypes(
      this.constructor.propTypes,
      this.props,
      'prop',
      this.constructor.name
    );
  }

  exists(a) {
    return typeof a !== 'undefined';
  }

  appendChild(child) {
    // add a child to the list to be rendered
    this.children.push(child);
  }

  removeChild(child) {
    if (this.exists(child.children)) {
      // we recursively remove all children
      child.children.forEach(function(w) {
        child.removeChild(w);
      });
    }
    // remove it, and destroy it
    if (this instanceof Root) {
      // root doesn't have any remove method
    } else if (typeof child === 'string') {
      // strings don't have remove methods either
    } else if (this.exists(this.element.setChild)) {
      // if it can only have one child, we don't need to "de-render" it
    } else if (this.exists(this.element.deleteAt)) {
      // if it can have multiple ex. VerticalBox
      this.element.deleteAt(this.children.indexOf(child));
      child.element.destroy();
    } else if (this.exists(child.element.close)) {
      // we have a window that we want to close
      if (!child.closing) {
        // we are already closing, so we don't want to do it again
        child.element.close();
      }
    } else if (
      child instanceof RadioButton.Item ||
      child instanceof Combobox.Item ||
      child instanceof EditableCombobox.Item
    ) {
      // these don't have deleteAt functions
      this.removeChildManual(child);
    }
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  reparentChild(child) {
    // we as the parent add the child to ourself again
    //child.addParent(this);
    child.render(this);
  }

  deparentChild(child) {
    // remove it, and destroy it
    if (this.exists(this.element.setChild)) {
    } else if (this.exists(this.element.deleteAt)) {
      // if it can have multiple ex. VerticalBox
      this.element.deleteAt(this.children.indexOf(child));
    } else if (this.exists(child.element.close)) {
      // we have a window that we want to close
      if (!child.closing) {
        // we are already closing, so we don't want to do it again
        child.element.close();
      }
    }
  }

  insertChild(child, beforeChild) {
    // used in reconciler to add a new child before others
    const beforeIndex = this.children.indexOf(beforeChild);
    for (let i = this.children.length - 1; i >= beforeIndex; i--) {
      // we go backwards cause otherwise we're trying to remove indexes in libui that don't exist, but still do in our local children array
      this.deparentChild(this.children[i]); // we remove all the children from the parent
    }
    this.children.splice(beforeIndex, 0, child); // insert our child
    for (let i = beforeIndex; i < this.children.length; i++) {
      this.reparentChild(this.children[i]);
    }
  }

  removeChildManual(child) {
    // used for RadioButtons and Picker to delete an Item
    const index = this.children.indexOf(child);
    for (let i = this.lastParent.children.length - 1; i >= 0; i--) {
      // we go backwards cause otherwise we're trying to remove indexes in libui that don't exist, but still do in our local children array
      this.lastParent.deparentChild(this.lastParent.children[i]); // we remove all the children from the parent
    }

    this.newElement();

    for (let child of this.lastParent.children) {
      this.lastParent.reparentChild(child); // add back all of the children, in the same order
    }

    this.initialProps(this.props);
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
    } else {
      parent.element.append(this.element, stretchy);
    }
  }

  addParent(parent) {
    this.lastParent = parent;
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
          if (prop === 'selected') {
            // do nothing for Picker and RadioButtons
          } else if (
            (prop === 'min' || prop === 'max') &&
            this instanceof Slider
          ) {
            // we changed the UiSlider, so we have to remake it
            this.minMaxAdjusted(prop, newProps);
          } else {
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
