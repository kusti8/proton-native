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

var Combobox = function (_DesktopComponent) {
  _inherits(Combobox, _DesktopComponent);

  function Combobox(root, props) {
    _classCallCheck(this, Combobox);

    var _this = _possibleConstructorReturn(this, (Combobox.__proto__ || Object.getPrototypeOf(Combobox)).call(this, root, props));

    _this.eventParameter = { onSelected: 'selected' };

    _this.root = root;
    _this.props = _extends({}, props);
    _this.setDefaults(props);
    _this.element = new _libuiNode2.default.UiCombobox();
    _this.initialProps(_this.props);
    return _this;
  }

  _createClass(Combobox, [{
    key: 'render',
    value: function render(parent) {
      this.addParent(parent);
      this.renderChildNode(this);
      this.element.selected = this.props.selected; // we need to set selected after the children are rendered (set selected after text is appended)
    }
  }]);

  return Combobox;
}(_DesktopComponent4.default);

Combobox.PropTypes = _extends({
  enabled: _propTypes2.default.bool,
  visible: _propTypes2.default.bool,
  selected: _propTypes2.default.number,
  onSelect: _propTypes2.default.func
}, _DesktopComponent3.universalPropTypes);

Combobox.defaultProps = _extends({
  enabled: true,
  visible: true,
  selected: -1,
  onSelect: function onSelect() {}
}, _DesktopComponent3.universalDefaultProps);

Combobox.Item = function (_DesktopComponent2) {
  _inherits(Item, _DesktopComponent2);

  function Item(root, props) {
    _classCallCheck(this, Item);

    var _this2 = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, root, props));

    _this2.root = root;
    _this2.props = _extends({}, props);
    _this2.element = {};
    _this2.setDefaults(props);
    _this2.initialProps(_this2.props);
    return _this2;
  }

  _createClass(Item, [{
    key: 'render',
    value: function render(parent) {
      this.addParent(parent);
      this.renderChildNode();
    }
  }]);

  return Item;
}(_DesktopComponent4.default);

Combobox.Item.PropTypes = {
  children: _propTypes2.default.string.isRequired
};

Combobox.Item.defaultProps = {
  children: ''
};

exports.default = Combobox;