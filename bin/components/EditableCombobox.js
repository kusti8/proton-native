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

var EditableCombobox = function (_DesktopComponent) {
  _inherits(EditableCombobox, _DesktopComponent);

  function EditableCombobox(root, props) {
    _classCallCheck(this, EditableCombobox);

    var _this = _possibleConstructorReturn(this, (EditableCombobox.__proto__ || Object.getPrototypeOf(EditableCombobox)).call(this, root, props));

    _this.eventParameter = { onChange: 'text' };

    _this.root = root;
    _this.props = _extends({}, props);
    _this.setDefaults(props);
    _this.element = new _libuiNode2.default.UiEditableCombobox();
    _this.initialProps(_this.props);
    return _this;
  }

  _createClass(EditableCombobox, [{
    key: 'render',
    value: function render(parent) {
      this.addParent(parent);
      this.renderChildNode(this);
      this.element.text = this.props.text; // we need to set selected after the children are rendered (set selected after text is appended)
    }
  }]);

  return EditableCombobox;
}(_DesktopComponent4.default);

EditableCombobox.PropTypes = _extends({
  enabled: _propTypes2.default.bool,
  visible: _propTypes2.default.bool,
  text: _propTypes2.default.string,
  onChange: _propTypes2.default.func
}, _DesktopComponent3.universalPropTypes);

EditableCombobox.defaultProps = _extends({
  enabled: true,
  visible: true,
  text: '',
  onChange: function onChange() {}
}, _DesktopComponent3.universalDefaultProps);

EditableCombobox.Item = function (_DesktopComponent2) {
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

EditableCombobox.Item.PropTypes = {
  children: _propTypes2.default.string.isRequired
};

EditableCombobox.Item.defaultProps = {
  children: ''
};

exports.default = EditableCombobox;