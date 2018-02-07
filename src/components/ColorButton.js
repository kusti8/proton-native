import DesktopComponent, {universalPropTypes, universalDefaultProps} from './DesktopComponent';;
import libui from 'libui-node';
import Color from 'color'
import PropTypes from 'prop-types'

class ColorButton extends DesktopComponent {
  eventParameter = {onChanged: 'color'}

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = {...props};
    this.setDefaults(props)
    this.element = new libui.UiColorButton();
    this.initialProps(props)
    
  }

  convertToColor(input) {
    input = input.toLowerCase()
    let alpha
    let c = Color(input).object()
    if (this.exists(c.alpha)) {
      alpha = c.alpha
    } else if (this.exists(c.a)) {
      alpha = c.a
    } else {
      alpha = 1
    }
    return new libui.Color(c.r, c.g, c.b, alpha)
  }

  toRgbObject(colorObj) {
    return {r: colorObj.r, g: colorObj.g, b: colorObj.b, a: colorObj.a}
  }

  update(oldProps, newProps) {
    for (let prop in newProps) { // normal props
      if (oldProps[prop] !== newProps[prop] && prop !== 'color') { // add check for color prop
        if (typeof props[prop] === 'function') {
          if (this.eventParameter[prop] !== '') {
            this.element[prop]( () => newProps[prop](this.element[this.eventParameter[prop]]) );
          } else {
            this.element[prop](newProps[prop])
          }
        } else if (prop == 'children') {
          this.element[childName] = newProps[prop]
        } else {
          this.element[prop] = newProps[prop];
        }
      } else if (prop === 'color') { // add check for color prop
        this.element[prop] = this.convertToColor(newProps[prop])
      }
    }
  }

  initialProps(props) { // same as desktop, except in function, convert it back to a RGBA object
    for (let prop in props) { // normal props 
      if (typeof props[prop] === 'function') {
        if (this.eventParameter[prop] !== '') {
          this.element[prop]( () => props[prop](this.toRgbObject(this.element[this.eventParameter[prop]]) ));
        } else {
          this.element[prop](props[prop])
        }
      } else if (prop == 'children') {
        this.element[this.childName] = props[prop]
      } else {
        this.element[prop] = props[prop];
      }
    }
  }

  render(parent) {
    this.addParent(parent)
    this.renderChildNode();
  }
}

ColorButton.PropTypes = {
  color: PropTypes.string,
  onChanged: PropTypes.func,
  ...universalPropTypes
}

ColorButton.defaultProps = {
  color: 'black',
  onChanged: () => {},
  ...universalDefaultProps
}

export default ColorButton;
