import DesktopComponent from './DesktopComponent'
import libui from 'libui-node'

class Text extends DesktopComponent {
  constructor(root, props) {
    super(root, props)
    this.root = root;
    this.props = props;
    this.element = new libui.UiLabel()
    if (props.children) {
      this.element.text = props.children
    }
    if (typeof props.enabled !== 'undefined') {
      this.element.enabled = props.enabled
    }
    if (typeof props.visible !== 'undefined') {
      console.log(props.visible)
      this.element.visible = props.visible
    }
  }

  update(oldProps, newProps) {
    if (newProps.enabled !== oldProps.title) {
      this.element.enabled = newProps.enabled
    }
    if (newProps.visible !== oldProps.visible) {
      this.element.visible = newProps.visible
    }
    if (newProps.children !== oldProps.children) {
      this.element.text = newProps.children
    }
  }

  render(parent) {
    if (this.props.children) {
      this.element.text = this.props.children
    }
    if (typeof parent.setChild !== 'undefined') {
      parent.setChild(this.element)
  } else if (typeof parent.append !== 'undefined') {
      const stretchy = typeof this.props.stretchy === 'undefined' ? true : this.props.stretchy
      parent.append(this.element, stretchy)
  }
    this.renderChildNode();
  }
}

export default Text;
