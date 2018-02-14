import DesktopComponent, {
  universalPropTypes,
  universalDefaultProps,
} from './DesktopComponent';
import libui from 'libui-node';
import PropTypes from 'prop-types';

var CURRENT_WINDOW = null;

export { CURRENT_WINDOW }

class Window extends DesktopComponent {
  constructor(root, props) {
    super(root, props);
    this.root = root;
    this.props = { ...props };
    this.setDefaults(props);
  }

  update(oldProps, newProps) {
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
    if (newProps.position !== oldProps.position) {
      this.element.position.x = newProps.position.x;
      this.element.position.y = newProps.position.y;
    }
    if (newProps.fullscreen !== oldProps.fullscreen) {
      this.element.fullscreen = newProps.fullscreen;
    }
    if (newProps.borderless !== oldProps.borderless) {
      this.element.borderless = newProps.borderless;
    }
    // if (newProps.centered !== oldProps.centered) {
    //   if (newProps.centered) {
    //     this.element.center()
    //   }
    // }
    if (newProps.closed !== oldProps.closed) {
      if (newProps.closed) {
        this.element.close();
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
        this.props.onClosing();
        this.element.close();
        if (this.props.lastWindow) {
          libui.stopLoop();
        }
      });
      this.element.margined = this.props.margined;
      this.element.position.x = this.props.position.x;
      this.element.position.y = this.props.position.y;
      this.element.fullscreen = this.props.fullscreen;
      this.element.borderless = this.props.borderless;

      if (this.props.centered) {
        this.element.center();
      }

      this.element.onPositionChanged(() => {
        this.props.onPositionChanged({
          x: this.element.position.x,
          y: this.element.position.y,
        });
      });
      this.element.onContentSizeChanged(() => {
        this.props.onContentSizeChanged({
          h: this.element.position.h,
          w: this.element.position.w,
        });
      });
      CURRENT_WINDOW = this.element
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
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  fullscreen: PropTypes.bool,
  borderless: PropTypes.bool,
  //centered: PropTypes.bool,
  lastWindow: PropTypes.bool,
  closed: PropTypes.bool,
  onClosing: PropTypes.func,
  onPositionChanged: PropTypes.func,
  onContentSizeChanged: PropTypes.func,
};

Window.defaultProps = {
  title: '',
  size: {
    h: 500,
    w: 500,
  },
  menuBar: true,
  margined: false,
  position: {
    x: 300,
    y: 300,
  },
  fullscreen: false,
  borderless: false,
  //centered: true,
  lastWindow: true,
  closed: false,
  onClosing: () => {},
  onPositionChanged: () => {},
  onContentSizeChanged: () => {},
};

export default Window;
