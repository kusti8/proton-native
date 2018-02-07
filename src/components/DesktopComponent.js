import { Tab, Form } from './';
import PropTypes from 'prop-types';

class DesktopComponent {
  constructor(root, props) {
    this.children = [];
  }

  setDefaults(props) {
    for (let prop in this.constructor.defaultProps) {
      if (!(prop in props)) {
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
    // append to parent. Can be overriden
    console.log(parent);
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
    } else {
      parent.element.append(this.element, stretchy);
    }
  }

  addParent(parent) {
    // add itself to the parent
    if (this.exists(parent.element.setChild)) {
      parent.element.setChild(this.element);
    } else if (this.exists(parent.element.append)) {
      this.addParentAppend(parent); // append itself to the parent
    }
  }

  update(oldProps, newProps) {
    // update all things, split into props, events, and children
    for (let prop in newProps) {
      // normal props
      if (oldProps[prop] !== newProps[prop]) {
        if (typeof props[prop] === 'function') {
          if (this.eventParameter[prop] !== '') {
            this.element[prop](() =>
              newProps[prop](this.element[this.eventParameter[prop]])
            );
          } else {
            this.element[prop](newProps[prop]);
          }
        } else if (prop == 'children') {
          this.element[childName] = newProps[prop];
        } else {
          this.element[prop] = newProps[prop];
        }
      }
    }
  }

  initialProps(props) {
    // same, but don't check for oldProps vs newProps, just set them
    for (let prop in props) {
      // normal props
      if (typeof props[prop] === 'function') {
        if (this.eventParameter[prop] !== '') {
          this.element[prop](() =>
            props[prop](this.element[this.eventParameter[prop]])
          );
        } else {
          this.element[prop](props[prop]);
        }
      } else if (prop == 'children') {
        this.element[this.childName] = props[prop];
      } else {
        this.element[prop] = props[prop];
      }
    }
  }
}

export const universalPropTypes = {
  stretchy: PropTypes.bool,
  label: PropTypes.string,
};

export const universalDefaultProps = {
  stretchy: true,
  label: '',
};

export default DesktopComponent;
