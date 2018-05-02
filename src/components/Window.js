import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

var CURRENT_WINDOW = null;

export { CURRENT_WINDOW };

class Window extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
  }

  update(oldProps, newProps) {
    this.props = { ...newProps };
    this.setDefaults(newProps);
    if (!this.exists(this.element)) {
      // if we haven't defined it yet, don't set props
      return;
    }

    if (newProps.title !== oldProps.title) {
      this.element.title = newProps.title;
    }
    if (newProps.size !== oldProps.size) {
      this.element.contentSize.h = newProps.size.h;
      this.element.contentSize.w = newProps.size.w;
    }
    if (newProps.margined !== oldProps.margined) {
      this.element.margined = newProps.margined;
    }
    if (newProps.fullscreen !== oldProps.fullscreen) {
      this.element.fullscreen = newProps.fullscreen;
    }
    if (newProps.borderless !== oldProps.borderless) {
      this.element.borderless = newProps.borderless;
    }
    if (newProps.closed !== oldProps.closed) {
      if (newProps.closed) {
        this.element.close();
        if (this.props.lastWindow) {
          libui.stopLoop();
        }
      }
    }
  }

  render() {
    if (!this.element) {
      // we need to create a window here so that menu can go first
      this.element = new libui.UiWindow(
        this.props.title,
        this.props.size.w,
        this.props.size.h,
        this.props.menuBar
      );
      this.element.onClosing(() => {
        this.closing = true;
        this.props.onClose();
        this.element.close();
        if (this.props.lastWindow) {
          libui.stopLoop();
        }
      });
      this.element.margined = this.props.margined;
      this.element.fullscreen = this.props.fullscreen;
      this.element.borderless = this.props.borderless;

      if (this.props.centered) {
        this.element.center();
      }

      this.element.onContentSizeChanged(() => {
        this.props.onContentSizeChange({
          h: this.element.contentSize.h,
          w: this.element.contentSize.w,
        });
      });
      CURRENT_WINDOW = this.element;
    }
    this.element.show();
    this.renderChildNode(this);
  }
}

Window.PropTypes = {
  title: PropTypes.string,
  size: PropTypes.shape({
    h: PropTypes.number,
    w: PropTypes.number,
  }),
  menuBar: PropTypes.bool,
  margined: PropTypes.bool,
  fullscreen: PropTypes.bool,
  borderless: PropTypes.bool,
  //centered: PropTypes.bool,
  lastWindow: PropTypes.bool,
  closed: PropTypes.bool,
  onClose: PropTypes.func,
  onContentSizeChange: PropTypes.func,
  children: PropTypes.object,
};

Window.defaultProps = {
  title: '',
  size: {
    h: 500,
    w: 500,
  },
  menuBar: true,
  margined: false,
  fullscreen: false,
  borderless: false,
  //centered: true,
  lastWindow: true,
  closed: false,
  onClose: () => {},
  onContentSizeChange: () => {},
};

export default Window;
