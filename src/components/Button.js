import DesktopComponent from './DesktopComponent'
import libui from 'libui-node'

class Button extends DesktopComponent {
  constructor(root, props) {
    super(root, props)
    console.log(root, props)
    this.root = root;
    this.props = props;
    this.element = new libui.UiButton()
    if (props.children) {
        this.element.text = props.children
    }
    if (typeof props.enabled !== 'undefined') {
    this.element.enabled = props.enabled
    }
    if (typeof props.visible !== 'undefined') {
    this.element.visible = props.visible
    }
    this.element.onClicked(props.onClicked)
}
  
    update(oldProps, newProps) {
      if (oldProps.enabled !== oldProps.enabled) {
        this.element.enabled = newProps.enabled
      }
      if (newProps.visible !== oldProps.visible) {
        this.element.visible = newProps.visible
      }
      if (newProps.onClicked !== oldProps.onClicked) {
          this.element.onClicked(newProps.onClicked)
      }
      if (newProps.children !== oldProps.children) {
        this.text.text = newProps.children
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

export default Button;
