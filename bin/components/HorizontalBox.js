'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

var _DesktopComponent2 = require('./DesktopComponent');

var _DesktopComponent3 = _interopRequireDefault(_DesktopComponent2);

var _libuiNode = require('libui-node');

var _libuiNode2 = _interopRequireDefault(_libuiNode);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      'Super expression must either be null or a function, not ' +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var HorizontalBox = (function(_DesktopComponent) {
  _inherits(HorizontalBox, _DesktopComponent);

  function HorizontalBox(root, props) {
    _classCallCheck(this, HorizontalBox);

    var _this = _possibleConstructorReturn(
      this,
      (HorizontalBox.__proto__ || Object.getPrototypeOf(HorizontalBox)).call(
        this,
        root,
        props
      )
    );

    _this.root = root;
    _this.props = _extends({}, props);
    _this.setDefaults(props);
    _this.element = new _libuiNode2.default.UiHorizontalBox();
    _this.initialProps(_this.props);
    return _this;
  }

  _createClass(HorizontalBox, [
    {
      key: 'render',
      value: function render(parent) {
        this.addParent(parent);
        this.renderChildNode(this);
      },
    },
  ]);

  return HorizontalBox;
})(_DesktopComponent3.default);

HorizontalBox.PropTypes = _extends({}, _DesktopComponent2.universalPropTypes, {
  enabled: _propTypes2.default.bool,
  visible: _propTypes2.default.bool,
  padded: _propTypes2.default.bool,
});

HorizontalBox.defaultProps = _extends(
  {},
  _DesktopComponent2.universalDefaultProps,
  {
    enabled: true,
    visible: true,
    padded: false,
  }
);

exports.default = HorizontalBox;
