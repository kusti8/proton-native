import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

class FontButton extends DesktopComponent {
  eventParameter = {
    onChanged: () => {
      const f = this.element.getFont();
      const italic = f.getItalic();
      return {
        fontFamily: f.getFamily(),
        fontSize: f.getSize(),
        fontWeight: f.getWeight(),
        fontStyle: Object.keys(libui.textItalic).find(
          v => libui.textItalic[v] === italic
        ),
        textStretch: f.getStretch(),
      };
    },
  };

  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
    this.newElement();
    this.initialProps(this.props);
  }

  newElement() {
    this.element = new libui.UiFontButton();
  }

  render(parent) {
    this.addParent(parent);
    this.renderChildNode();
  }
}

FontButton.propTypes = {
  ...universalPropTypes,
  onChange: PropTypes.func,
};

FontButton.defaultProps = {
  ...universalDefaultProps,
  onChange: () => {},
};

export default FontButton;
