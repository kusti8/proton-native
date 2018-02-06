import libui from 'libui-node';

export default class DesktopComponent {
  constructor() {
    this.children = [];
  }

  exists(a) {
    return typeof a !== 'undefined'
  }

  appendChild(child) { // add a child to the list to be rendered
    this.children.push(child);
  }

  removeChild(child) { // remove it, and destroy it
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

  renderChildNode(parent) { // render the children
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'object') {
        this.children[i].render(parent);
      }
    }
  }

  addParentAppend(parent) { // append to parent. Can be overriden
    const stretchy =
      !this.exists(this.props.stretchy) ? true : this.props.stretchy;
    if (parent instanceof libui.UiForm) {
      parent.element.append(this.props.label, this.element, stretchy)
    } else if (parent instanceof libui.UiTab) {
      parent.element.append(this.props.label, this.element, stretchy)
      if (this.exists(this.props.margined)) {
        //parent.element.setMargined()
      }
    } else {
      parent.element.append(this.element, stretchy);
    }
  }

  addParent(parent) { // add itself to the parent
    if (this.exists(parent.element.setChild)) {
      parent.element.setChild(this.element);
    } else if (this.exists(parent.element.append)) {
      this.addParentAppend(parent) // append itself to the parent
    }
  }

  updateProps(oldProps, newProps) {
    if (this.exists(this.expectedProps)) {
      for (let prop of this.expectedProps) { // normal props
        if (newProps[prop] !== oldProps[prop] && prop in newProps) {
          this.element[prop] = newProps[prop];
        }
      }
    }
  }

  updateEvents(oldProps, newProps) {
    if (this.exists(this.expectedEvents)) {
      for (let prop in this.expectedEvents) { // event props
        if (prop in newProps && newProps[prop] !== oldProps[prop]) {
          if (this.expectedEvents[prop] !== '') {
            this.element[prop]( () => newProps[prop](this.element[this.expectedEvents[prop]]) );
          } else {
            this.element[prop](newProps[prop])
          }
        }
      }
    }
  }

  updateChild(oldProps, newProps) {
    if (this.exists(this.expectedChild)) {
      if (newProps.children !== oldProps.children) { // text child
        this.element[this.expectedChild] = newProps.children;
      }
    }
  }

  update(oldProps, newProps) { // update all things, split into props, events, and children
    this.updateProps(oldProps, newProps)
    this.updateEvents(oldProps, newProps)
    this.updateChild(oldProps, newProps)
  }

  initialNormalProps(props) {
    if (this.exists(props)) {
      if (this.exists(this.expectedProps)) {
        for (let prop of this.expectedProps) { // normal props
            if (prop in props) {
              this.element[prop] = props[prop];
            }
        }
      }
    }
  }

  initialEvents(props) {
    if (this.exists(this.expectedEvents)) {
      for (let prop in this.expectedEvents) { // event props
        if (prop in props) {
          if (this.expectedEvents[prop] !== '') {
            this.element[prop]( () => props[prop](this.element[this.expectedEvents[prop]]) );
          } else {
            this.element[prop](props[prop])
          }
        }
      }
    }
  }

  initialChild(props) {
    if (this.exists(this.expectedChild)) { // text child
      if (props.children) {
        this.element[this.expectedChild] = props.children;
      }
    }
  }

  initialProps(props) { // same, but don't check for oldProps vs newProps, just set them
    this.initialNormalProps(props)
    this.initialEvents(props)
    this.initialChild(props)
  }
}
