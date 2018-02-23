'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.universalDefaultProps = exports.universalPropTypes = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('./');

var _2 = require('../');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var functionMappings = {
  onChange: 'onChanged',
  onClose: 'onClosing',
  onClick: 'onClicked',
  onToggle: 'onToggled',
  onSelect: 'onSelected',
  onContentSizeChange: 'onContentSizeChanged',
  onPositionChange: 'onPositionChanged'
};

var DesktopComponent = function () {
  function DesktopComponent(root, props) {
    _classCallCheck(this, DesktopComponent);

    this.children = [];
  }

  _createClass(DesktopComponent, [{
    key: 'setDefaults',
    value: function setDefaults(props) {
      for (var prop in this.constructor.defaultProps) {
        if (!(prop in props) || typeof props[prop] === 'undefined') {
          // children can exist, but be undefined
          this.props[prop] = this.constructor.defaultProps[prop];
        }
      }
      _propTypes2.default.checkPropTypes(this.constructor.PropTypes, this.props, 'prop', this.constructor.name);
    }
  }, {
    key: 'exists',
    value: function exists(a) {
      return typeof a !== 'undefined';
    }
  }, {
    key: 'appendChild',
    value: function appendChild(child) {
      // add a child to the list to be rendered
      this.children.push(child);
    }
  }, {
    key: 'removeChild',
    value: function removeChild(child) {
      // remove it, and destroy it
      if (this.exists(this.element.setChild)) {
        // if it can only have one child, we don't need to "de-render" it
      } else if (this.exists(this.element.deleteAt)) {
        // if it can have multiple ex. VerticalBox
        this.element.deleteAt(this.children.indexOf(child));
        child.element.destroy();
      }
      var index = this.children.indexOf(child);
      this.children.splice(index, 1);
    }
  }, {
    key: 'renderChildNode',
    value: function renderChildNode(parent) {
      // render the children
      for (var i = 0; i < this.children.length; i += 1) {
        if (_typeof(this.children[i]) === 'object') {
          this.children[i].render(parent);
        }
      }
    }
  }, {
    key: 'addParentAppend',
    value: function addParentAppend(parent) {
      // append to parent. Can be overriden
      var stretchy = this.props.stretchy;
      if (parent instanceof _.Form) {
        // we have a form
        parent.element.append(this.props.label, this.element, stretchy);
      } else if (parent instanceof _.Tab) {
        // we have a tab
        parent.element.append(this.props.label, this.element);
        var index = parent.children.indexOf(this);
        var margined = this.props.margined;
        parent.element.setMargined(index, margined);
      } else if (parent instanceof _.Grid) {
        parent.element.append(this.element, this.props.column, this.props.row, this.props.span.x, this.props.span.y, this.props.expand.h, this.props.align.h, this.props.expand.v, this.props.align.v);
      } else if (parent instanceof _.Combobox || parent instanceof _.RadioButton || parent instanceof _.EditableCombobox) {
        // we assume we are a ComboBox.Item, and just append the child
        parent.element.append(this.props.children);
      } else if (parent instanceof _.MenuBar) {
        if (this.props.type === 'Item') {
          this.element = parent.element.appendItem(this.props.children);
        } else if (this.props.type === 'Check') {
          this.element = parent.element.appendCheckItem(this.props.children);
        } else if (this.props.type === 'Quit') {
          this.element = parent.element.appendQuitItem();
        } else if (this.props.type === 'Preferences') {
          this.element = parent.element.appendPreferencesItem();
        } else if (this.props.type === 'About') {
          this.element = parent.element.appendAboutItem();
        } else if (this.props.type === 'Separator') {
          parent.element.appendSeparator();
        }
      } else if (this instanceof _2.Menu) {
        // we don't need to setChild with a menu
      } else {
        parent.element.append(this.element, stretchy);
      }
    }
  }, {
    key: 'addParent',
    value: function addParent(parent) {
      // add itself to the parent
      if (this.exists(parent.element.setChild)) {
        parent.element.setChild(this.element);
      } else if (this.exists(parent.element.append) || this.exists(parent.element.appendItem)) {
        this.addParentAppend(parent); // append itself to the parent
      }
    }
  }, {
    key: 'update',
    value: function update(oldProps, newProps) {
      var _this = this;

      var _loop = function _loop(prop) {
        // normal props
        if (oldProps[prop] !== newProps[prop]) {
          if (typeof newProps[prop] === 'function') {
            var translatedProp = functionMappings[prop]; // translate React function names in libui names
            if (typeof _this.eventParameter[translatedProp] === 'function') {
              // if we don't have a translatedProperty, then we use a function, so handle that
              _this.element[translatedProp](function () {
                return newProps[prop](_this.eventParameter[translatedProp]());
              });
            } else if (_this.eventParameter[translatedProp] !== '') {
              _this.element[translatedProp](function () {
                return newProps[prop](_this.element[_this.eventParameter[translatedProp]]);
              });
            } else {
              _this.element[translatedProp](newProps[prop]);
            }
          } else if (prop == 'children') {
            if (_this.exists(_this.childName)) {
              // prevent stray children from crashing program (like App component)
              _this.element[_this.childName] = newProps[prop];
            }
          } else {
            if (prop !== 'selected') {
              _this.element[prop] = newProps[prop];
            }
          }
        }
      };

      // update all things, split into props, events, and children
      for (var prop in newProps) {
        _loop(prop);
      }
    }
  }, {
    key: 'initialProps',
    value: function initialProps(props) {
      var _this2 = this;

      var _loop2 = function _loop2(prop) {
        // normal props
        if (typeof props[prop] === 'function') {
          var translatedProp = functionMappings[prop]; // translate React function names in libui names
          if (typeof _this2.eventParameter[translatedProp] === 'function') {
            // if we don't have a property, then we use a function, so handle that
            _this2.element[translatedProp](function () {
              return props[prop](_this2.eventParameter[translatedProp]());
            });
          } else if (_this2.eventParameter[translatedProp] !== '') {
            _this2.element[translatedProp](function () {
              return props[prop](_this2.element[_this2.eventParameter[translatedProp]]);
            });
          } else {
            _this2.element[translatedProp](props[prop]);
          }
        } else if (prop == 'children') {
          if (_this2.exists(_this2.childName)) {
            // prevent stray children from crashing program (like App component)
            _this2.element[_this2.childName] = props[prop];
          }
        } else {
          if (prop !== 'selected') {
            _this2.element[prop] = props[prop];
          }
        }
      };

      // same, but don't check for oldProps vs newProps, just set them
      for (var prop in props) {
        _loop2(prop);
      }
    }
  }]);

  return DesktopComponent;
}();

var universalPropTypes = exports.universalPropTypes = {
  stretchy: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  column: _propTypes2.default.number,
  row: _propTypes2.default.number,
  span: _propTypes2.default.shape({
    x: _propTypes2.default.number,
    y: _propTypes2.default.number
  }),
  expand: _propTypes2.default.shape({
    h: _propTypes2.default.bool,
    v: _propTypes2.default.bool
  }),
  align: _propTypes2.default.shape({
    h: _propTypes2.default.bool,
    v: _propTypes2.default.bool
  })
};

var universalDefaultProps = exports.universalDefaultProps = {
  stretchy: true,
  label: '',
  column: 0,
  row: 0,
  span: {
    x: 1,
    y: 1
  },
  expand: {
    h: true,
    v: true
  },
  align: {
    h: true,
    v: true
  }
};

exports.default = DesktopComponent;