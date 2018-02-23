'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DesktopComponent3 = require('./DesktopComponent');

var _DesktopComponent4 = _interopRequireDefault(_DesktopComponent3);

var _libuiNode = require('libui-node');

var _libuiNode2 = _interopRequireDefault(_libuiNode);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MenuBar = function (_DesktopComponent) {
  _inherits(MenuBar, _DesktopComponent);

  function MenuBar(root, props) {
    _classCallCheck(this, MenuBar);

    var _this = _possibleConstructorReturn(this, (MenuBar.__proto__ || Object.getPrototypeOf(MenuBar)).call(this, root, props));

    _this.root = root;
    _this.props = _extends({}, props);
    _this.setDefaults(props);
    _this.element = new _libuiNode2.default.UiMenu(_this.props.label);
    _this.initialProps(_this.props);
    return _this;
  }

  _createClass(MenuBar, [{
    key: 'render',
    value: function render(parent) {
      this.addParent(parent);
      this.renderChildNode(this);
    }
  }]);

  return MenuBar;
}(_DesktopComponent4.default);

MenuBar.PropTypes = _extends({
  label: _propTypes2.default.string
}, _DesktopComponent3.universalPropTypes);

MenuBar.defaultProps = _extends({
  label: ''
}, _DesktopComponent3.universalDefaultProps);

MenuBar.Item = function (_DesktopComponent2) {
  _inherits(Item, _DesktopComponent2);

  function Item(root, props) {
    _classCallCheck(this, Item);

    var _this2 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, root, props));

    _this2.eventParameter = { onClicked: 'checked' };

    _this2.root = root;
    _this2.props = _extends({}, props);
    _this2.setDefaults(props);
    _this2.element = {};
    return _this2;
  }

  _createClass(Item, [{
    key: 'update',
    value: function update() {
      // noop
      // no element
    }
  }, {
    key: 'render',
    value: function render(parent) {
      this.addParent(parent);
      this.initialProps(this.props); // we can only set props after they have been created in addParent
      this.renderChildNode();
    }
  }]);

  return Item;
}(_DesktopComponent4.default);

MenuBar.Item.PropTypes = _extends({
  children: _propTypes2.default.string,
  checked: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(['Check', 'Quit', 'About', 'Preferences', 'Separator', 'Item']),
  onClick: _propTypes2.default.func
}, _DesktopComponent3.universalPropTypes);

MenuBar.Item.defaultProps = _extends({
  children: '',
  checked: false,
  type: 'Item',
  onClick: function onClick() {}
}, _DesktopComponent3.universalDefaultProps);

exports.default = MenuBar;