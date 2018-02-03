import React, {Component} from 'react'
import libui from 'libui-node'

class Window extends Component {
  // Stores all the children
  children = [];

  constructor(root, props) {
    super(root, props)
    console.log("Created window")
    this.win = new libui.UiWindow(props.name, props.width, props.height, props.menuBar)
  }

  appendChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    this.children.splice(index, 1);
  }

  update(oldProps, newProps) {
    if (newProps.title !== oldProps.title) {
      this.win.title = newProps.title
    }
    if (newProps.height !== oldProps.height) {
      this.win.contentSize.h = newProps.height
    }
    if (newProps.width !== oldProps.width) {
      this.win.contentSize.w = newProps.width
    }
  }

  renderChildNode() {
    for (let i = 0; i < this.children.length; i += 1) {
      if (typeof this.children[i] === 'object') {
        this.children[i].render();
      }
    }
  }

  render() {
    this.renderChildNode();
    return null
  }
}

export default Window;
