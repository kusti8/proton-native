'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
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

var TextInput = (function(_Component) {
  _inherits(TextInput, _Component);

  function TextInput() {
    _classCallCheck(this, TextInput);

    return _possibleConstructorReturn(
      this,
      (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).apply(
        this,
        arguments
      )
    );
  }

  _createClass(TextInput, [
    {
      key: 'render',
      value: function render() {
        var _props = this.props,
          secure = _props.secure,
          multiline = _props.multiline,
          children = _props.children,
          otherProps = _objectWithoutProperties(_props, [
            'secure',
            'multiline',
            'children',
          ]);

        if (secure) {
          return _react2.default.createElement(
            _.PasswordEntry,
            otherProps,
            children
          );
        }

        if (multiline) {
          return _react2.default.createElement(
            _.MultilineEntry,
            otherProps,
            children
          );
        }

        return _react2.default.createElement(_.Entry, otherProps, children);
      },
    },
  ]);

  return TextInput;
})(_react.Component);

TextInput.propTypes = {
  secure: _propTypes2.default.bool,
  multiline: _propTypes2.default.bool,
};

TextInput.defaultProps = {
  secure: false,
  multiline: false,
};

exports.default = TextInput;
