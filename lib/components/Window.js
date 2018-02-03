'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libuiNode = require('libui-node');

var _libuiNode2 = _interopRequireDefault(_libuiNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Window = function (_Component) {
  _inherits(Window, _Component);

  function Window(root, props) {
    _classCallCheck(this, Window);

    var _this = _possibleConstructorReturn(this, (Window.__proto__ || Object.getPrototypeOf(Window)).call(this, root, props));

    _this.children = [];

    _this.win = new _libuiNode2.default.UiWindow(props.name, props.width, props.height, props.menuBar);
    return _this;
  }
  // Stores all the children


  _createClass(Window, [{
    key: 'appendChild',
    value: function appendChild(child) {
      this.children.push(child);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      var index = this.children.indexOf(child);
      this.children.splice(index, 1);
    }
  }, {
    key: 'update',
    value: function update(oldProps, newProps) {
      if (newProps.title !== oldProps.title) {
        this.win.title = newProps.title;
      }
      if (newProps.height !== oldProps.height) {
        this.win.contentSize.h = newProps.height;
      }
      if (newProps.width !== oldProps.width) {
        this.win.contentSize.w = newProps.width;
      }
    }
  }, {
    key: 'renderChildNode',
    value: function renderChildNode() {
      for (var i = 0; i < this.children.length; i += 1) {
        if (_typeof(this.children[i]) === 'object') {
          this.children[i].render();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      this.renderChildNode();
      return null;
    }
  }]);

  return Window;
}(_react.Component);

exports.default = Window;