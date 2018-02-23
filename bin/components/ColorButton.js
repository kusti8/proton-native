'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DesktopComponent2 = require('./DesktopComponent');

var _DesktopComponent3 = _interopRequireDefault(_DesktopComponent2);

var _libuiNode = require('libui-node');

var _libuiNode2 = _interopRequireDefault(_libuiNode);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColorButton = function (_DesktopComponent) {
  _inherits(ColorButton, _DesktopComponent);

  function ColorButton(root, props) {
    _classCallCheck(this, ColorButton);

    var _this = _possibleConstructorReturn(this, (ColorButton.__proto__ || Object.getPrototypeOf(ColorButton)).call(this, root, props));

    _this.eventParameter = { onChanged: 'color' };

    _this.root = root;
    _this.props = _extends({}, props);
    _this.setDefaults(props);
    _this.element = new _libuiNode2.default.UiColorButton();
    _this.initialProps(_this.props);
    return _this;
  }

  _createClass(ColorButton, [{
    key: 'convertToColor',
    value: function convertToColor(input) {
      input = input.toLowerCase();
      var alpha = void 0;
      var c = (0, _color2.default)(input).object();
      if (this.exists(c.alpha)) {
        alpha = c.alpha;
      } else if (this.exists(c.a)) {
        alpha = c.a;
      } else {
        alpha = 1;
      }
      return new _libuiNode2.default.Color(c.r, c.g, c.b, alpha);
    }
  }, {
    key: 'toRgbObject',
    value: function toRgbObject(colorObj) {
      return { r: colorObj.r, g: colorObj.g, b: colorObj.b, a: colorObj.a };
    }
  }, {
    key: 'update',
    value: function update(oldProps, newProps) {
      var _this2 = this;

      var _loop = function _loop(prop) {
        // normal props
        if (oldProps[prop] !== newProps[prop] && prop !== 'color') {
          // add check for color prop
          if (typeof props[prop] === 'function') {
            if (_this2.eventParameter[prop] !== '') {
              _this2.element[prop](function () {
                return newProps[prop](_this2.element[_this2.eventParameter[prop]]);
              });
            } else {
              _this2.element[prop](newProps[prop]);
            }
          } else if (prop == 'children') {
            _this2.element[childName] = newProps[prop];
          } else {
            _this2.element[prop] = newProps[prop];
          }
        } else if (prop === 'color') {
          // add check for color prop
          _this2.element[prop] = _this2.convertToColor(newProps[prop]);
        }
      };

      for (var prop in newProps) {
        _loop(prop);
      }
    }
  }, {
    key: 'initialProps',
    value: function initialProps(props) {
      var _this3 = this;

      var _loop2 = function _loop2(prop) {
        // normal props
        if (typeof props[prop] === 'function') {
          if (_this3.eventParameter[prop] !== '') {
            _this3.element[prop](function () {
              return props[prop](_this3.toRgbObject(_this3.element[_this3.eventParameter[prop]]));
            });
          } else {
            _this3.element[prop](props[prop]);
          }
        } else if (prop == 'children') {
          _this3.element[_this3.childName] = props[prop];
        } else {
          _this3.element[prop] = props[prop];
        }
      };

      // same as desktop, except in function, convert it back to a RGBA object
      for (var prop in props) {
        _loop2(prop);
      }
    }
  }, {
    key: 'render',
    value: function render(parent) {
      this.addParent(parent);
      this.renderChildNode();
    }
  }]);

  return ColorButton;
}(_DesktopComponent3.default);

ColorButton.PropTypes = _extends({
  color: _propTypes2.default.string,
  onChange: _propTypes2.default.func
}, _DesktopComponent2.universalPropTypes);

ColorButton.defaultProps = _extends({
  color: 'black',
  onChange: function onChange() {}
}, _DesktopComponent2.universalDefaultProps);

exports.default = ColorButton;