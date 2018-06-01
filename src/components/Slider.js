import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class Slider extends DesktopComponent {
  eventParameter = { onChanged: 'value' };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiSlider(this.props.min, this.props.max);
  }

  minMaxAdjusted(prop, newProps) {
    this.props = { ...newProps };
    for (let i = this.lastParent.children.length - 1; i >= 0; i--) {
      // we go backwards cause otherwise we're trying to remove indexes in libui that don't exist, but still do in our local children array
      this.lastParent.deparentChild(this.lastParent.children[i]); // we remove all the children from the parent
    }

    this.element = new libui.UiSlider(this.props.min, this.props.max); // we make a new element
    for (let child of this.lastParent.children) {
      this.lastParent.reparentChild(child); // add back all of the children, in the same order
    }

    if (
      this.props.value > this.props.max ||
      this.props.value < this.props.min
    ) {
      this.props.value = Math.max(
        Math.min(this.props.value, this.props.max),
        this.props.min
      ); // make the value inside the range
      this.props.onChange(this.props.value); // and trigger onChange so that the value can get updated
    }
    this.initialProps(this.props);
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

Slider.propTypes = {
  ...universalPropTypes,
  enabled: PropTypes.bool,
  visible: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
};

Slider.defaultProps = {
  ...universalDefaultProps,
  enabled: true,
  visible: true,
  value: 0,
  onChange: () => {},
  min: 0,
  max: 100,
};

export default Slider;
