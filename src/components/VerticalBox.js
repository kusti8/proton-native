import DesktopComponent from './DesktopComponent'
import libui from 'libui-node'

class VerticalBox extends DesktopComponent {
  constructor(root, props) {
    super(root, props)
    this.root = root;
    this.props = props;
    this.element = new libui.UiVerticalBox()

    if (typeof props.enabled !== 'undefined') {
    this.element.enabled = props.enabled
    }
    if (typeof props.visible !== 'undefined') {
    this.element.visible = props.visible
    }
    if (typeof props.padded !== 'undefined') {
      this.element.padded = props.padded
    }
}
  
    update(oldProps, newProps) {
      if (oldProps.enabled !== oldProps.enabled) {
        this.element.enabled = newProps.enabled
      }
      if (newProps.visible !== oldProps.visible) {
        this.element.visible = newProps.visible
      }
      if (newProps.padded !== oldProps.padded) {
          this.element.padded = newProps.padded
      }
    }

  render(parent) {
    if (this.props.children) {
        this.element.text = this.props.children
      }
    parent.setChild(this.element)
    this.renderChildNode(this.element);
  }
}

export default VerticalBox;
