import DesktopComponent from './DesktopComponent';
import libui from 'libui-node';
import ColorConvert from '../lib/colorConverter'

class ColorButton extends DesktopComponent {
  expectedProps = ['color']
  expectedEvents = {'onChanged': 'color'}

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = props;
    this.element = new libui.UiColorButton();
    this.initialProps(props)
  }

  convertToColor(input) {
    input = input.toLowerCase()
    c = ColorConvert.w3color(input)
    if (typeof caches.toRgb !== 'undefined') { // if we put in an object, there is no function
      c = c.toRgb()
    }
    return new libui.Color(c.r, c.g, c.b, c.a)
  }

  toRgbObject(colorObj) {
    return {r: colorObj.r, g: colorObj.g, b: colorObj.b, a: colorObj.a}
  }

  update(oldProps, newProps) {
    if (newProps.color !== oldProps.color) {
      this.element.color = this.convertToColor(newProps.color);
    }

    if (typeof this.expectedEvents !== 'undefined') {
      for (let prop of this.expectedEvents) { // event props
        if (newProps[prop] !== oldProps[prop]) {
          this.element[prop](newProps[prop]);
        }
      }
    }
  }

  initialProps(props) {
    if (typeof props !== 'undefined') {
      if (typeof props.color !== 'undefined') {
        this.element.color = this.convertToColor(props.color)
      }
      }

      if (typeof this.expectedEvents !== 'undefined') {
        for (let prop in this.expectedEvents) { // event props
          if (prop in props) {
            if (this.expectedEvents[prop] !== '') {
              this.element[prop]( () => props[prop](this.toRgbObject(this.element[this.expectedEvents[prop]])) );
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

  render(parent) {
    if (this.props.children) {
      this.element.color = this.props.children;
    }
    this.addParent(parent)
    this.renderChildNode();
  }
}

export default ColorButton;
