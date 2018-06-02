import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import Color from 'color';
import PropTypes from 'prop-types';

const functionMappings = {
  onChange: 'onChanged',
};

class ColorButton extends DesktopComponent {
  eventParameter = { onChanged: 'color' };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiColorButton();
  }

  toColorLibui(input) {
    input = input.toLowerCase();
    let alpha;
    let c = Color(input).object();
    if (this.exists(c.alpha)) {
      alpha = c.alpha;
    } else if (this.exists(c.a)) {
      alpha = c.a;
    } else {
      alpha = 1;
    }
    return new libui.Color(c.r / 255, c.g / 255, c.b / 255, alpha);
  }

  toColorUser(colorObj) {
    return {
      r: Math.round(colorObj.r * 255),
      g: Math.round(colorObj.g * 255),
      b: Math.round(colorObj.b * 255),
      a: colorObj.a,
    };
  }

  update(oldProps, newProps) {
    for (let prop in newProps) {
      // normal props
      if (oldProps[prop] !== newProps[prop] && prop !== 'color') {
        // add check for color prop
        if (typeof newProps[prop] === 'function') {
          const translatedProp = functionMappings[prop]; // translate React function names in libui names
          if (typeof this.eventParameter[translatedProp] === 'function') {
            // if we don't have a translatedProperty, then we use a function, so handle that
            this.element[translatedProp](() =>
              newProps[prop](this.eventParameter[translatedProp]())
            );
          } else if (this.eventParameter[translatedProp] === 'color') {
            this.element[translatedProp](() =>
              newProps[prop](
                this.toColorUser(
                  this.element[this.eventParameter[translatedProp]]
                )
              )
            );
          } else if (this.eventParameter[translatedProp] !== '') {
            this.element[translatedProp](() =>
              newProps[prop](this.element[this.eventParameter[translatedProp]])
            );
          } else {
            this.element[translatedProp](newProps[prop]);
          }
        } else if (prop == 'children') {
          this.element[childName] = newProps[prop];
        } else {
          this.element[prop] = newProps[prop];
        }
      } else if (oldProps[prop] !== newProps[prop]) {
        // add check for color prop
        this.element[prop] = this.toColorLibui(newProps[prop]);
      }
    }
  }

  initialProps(props) {
    // same as desktop, except in function, convert it back to a RGBA object
    for (let prop in props) {
      // normal props
      if (typeof props[prop] === 'function') {
        const translatedProp = functionMappings[prop]; // translate React function names in libui names
        if (typeof this.eventParameter[translatedProp] === 'function') {
          // if we don't have a property, then we use a function, so handle that
          this.element[translatedProp](() =>
            props[prop](this.eventParameter[translatedProp]())
          );
        } else if (this.eventParameter[translatedProp] === 'color') {
          this.element[translatedProp](() =>
            props[prop](
              this.toColorUser(
                this.element[this.eventParameter[translatedProp]]
              )
            )
          );
        } else if (this.eventParameter[translatedProp] !== '') {
          this.element[translatedProp](() =>
            props[prop](this.element[this.eventParameter[translatedProp]])
          );
        } else {
          this.element[translatedProp](props[prop]);
        }
      } else if (prop == 'children') {
        this.element[this.childName] = props[prop];
      } else if (prop === 'color') {
        this.element[prop] = this.toColorLibui(props[prop]);
      } else {
        this.element[prop] = props[prop];
      }
    }
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

ColorButton.propTypes = {
  ...universalPropTypes,
  color: PropTypes.string,
  onChange: PropTypes.func,
};

ColorButton.defaultProps = {
  ...universalDefaultProps,
  color: 'black',
  onChange: () => {},
};

export default ColorButton;
