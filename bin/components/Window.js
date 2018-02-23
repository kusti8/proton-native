'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CURRENT_WINDOW = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DesktopComponent2 = require('./DesktopComponent');

var _DesktopComponent3 = _interopRequireDefault(_DesktopComponent2);

var _libuiNode = require('libui-node');

var _libuiNode2 = _interopRequireDefault(_libuiNode);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _eventLoop = require('../eventLoop');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CURRENT_WINDOW = null;

exports.CURRENT_WINDOW = CURRENT_WINDOW;

var Window = function (_DesktopComponent) {
  _inherits(Window, _DesktopComponent);

  function Window(root, props) {
    _classCallCheck(this, Window);

    var _this = _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this, root, props));

    _this.root = root;
    _this.props = _extends({}, props);
    _this.setDefaults(props);
    return _this;
  }

  _createClass(Window, [{
    key: 'update',
    value: function update(oldProps, newProps) {
      if (!this.exists(this.element))
        // if we haven't defined it yet, don't set props
        return;
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
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.element) {
        // we need to create a window here so that menu can go first
        this.element = new _libuiNode2.default.UiWindow(this.props.title, this.props.size.w, this.props.size.h, this.props.menuBar);
        this.element.onClosing(function () {
          _this2.props.onClose();
          _this2.element.close();
          if (_this2.props.lastWindow) {
            (0, _eventLoop.stop)();
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

        this.element.onPositionChanged(function () {
          _this2.props.onPositionChange({
            x: _this2.element.position.x,
            y: _this2.element.position.y
          });
        });
        this.element.onContentSizeChanged(function () {
          _this2.props.onContentSizeChange({
            h: _this2.element.position.h,
            w: _this2.element.position.w
          });
        });
        exports.CURRENT_WINDOW = CURRENT_WINDOW = this.element;
      }
      this.element.show();
      this.renderChildNode(this);
    }
  }]);

  return Window;
}(_DesktopComponent3.default);

Window.PropTypes = {
  title: _propTypes2.default.string,
  size: _propTypes2.default.shape({
    h: _propTypes2.default.number,
    w: _propTypes2.default.number
  }),
  menuBar: _propTypes2.default.bool,
  margined: _propTypes2.default.bool,
  position: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),
  fullscreen: _propTypes2.default.bool,
  borderless: _propTypes2.default.bool,
  //centered: PropTypes.bool,
  lastWindow: _propTypes2.default.bool,
  closed: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  onPositionChange: _propTypes2.default.func,
  onContentSizeChange: _propTypes2.default.func
};

Window.defaultProps = {
  title: '',
  size: {
    h: 500,
    w: 500
  },
  menuBar: true,
  margined: false,
  position: {
    x: 300,
    y: 300
  },
  fullscreen: false,
  borderless: false,
  //centered: true,
  lastWindow: true,
  closed: false,
  onClose: function onClose() {},
  onPositionChange: function onPositionChange() {},
  onContentSizeChange: function onContentSizeChange() {}
};

exports.default = Window;