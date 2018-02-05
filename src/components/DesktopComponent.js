import libui from 'libui-node';

export default class DesktopComponent {
  constructor() {
    this.children = [];
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    if (typeof this.element.setChild !== 'undefined') {
      // if it can only have one child, we don't need to "de-render" it
    } else if (typeof this.element.deleteAt !== 'undefined') {
      // if it can have multiple ex. VerticalBox
      this.element.deleteAt(this.children.indexOf(child));
      child.element.destroy();
    }
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
    console.log('Completed delete');
  }

  renderChildNode(parent) {
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'object') {
        this.children[i].render(parent);
      }
    }
  }

  addParent(parent) {
    if (typeof parent.setChild !== 'undefined') {
      parent.setChild(this.element);
    } else if (typeof parent.append !== 'undefined') {
      const stretchy =
        typeof this.props.stretchy === 'undefined' ? true : this.props.stretchy;
      parent.append(this.element, stretchy);
    }
  }

  update(oldProps, newProps) {
    if (typeof this.expectedProps !== 'undefined') {
      for (let prop of this.expectedProps) { // normal props
        if (newProps[prop] !== oldProps[prop] && prop in newProps) {
          this.element[prop] = newProps[prop];
        }
      }
    }

    if (typeof this.expectedEvents !== 'undefined') {
      for (let prop of this.expectedEvents) { // event props
        if (newProps[prop] !== oldProps[prop] && prop in newProps) {
          if (this.expectedEvents[prop] !== '') {
            this.element[prop]( () => newProps[prop](this.element[this.expectedEvents[prop]]) );
          } else {
            this.element[prop](newProps[prop])
          }
        }
      }
    }

    if (typeof this.expectedChild !== 'undefined') {
      if (newProps.children !== oldProps.children) { // text child
        this.element[expectedChild] = newProps.children;
      }
    }
  }

  initialProps(props) {
    if (typeof props !== 'undefined') {
      if (typeof this.expectedProps !== 'undefined') {
        for (let prop of this.expectedProps) { // normal props
            if (prop in props) {
              this.element[prop] = props[prop];
            }
        }
      }

      if (typeof this.expectedEvents !== 'undefined') {
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

      if (typeof this.expectedChild !== 'undefined') { // text child
        if (props.children) {
          this.element[this.expectedChild] = props.children;
        }
      }
    }
  }
}
