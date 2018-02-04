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

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

var Text = (function() {
  function Text(root, props) {
    _classCallCheck(this, Text);

    this.children = [];

    this.root = root;
    this.props = props;

    this.adder = this.root.doc.createP();
  }

  _createClass(Text, [
    {
      key: 'appendChild',
      value: function appendChild(child) {
        this.children.push(child);
      },
    },
    {
      key: 'removeChild',
      value: function removeChild(child) {
        var index = this.children.indexOf(child);
        this.children.splice(index, 1);
      },
    },
    {
      key: 'update',
      value: function update(oldProps, newProps) {},
    },
    {
      key: 'renderChildren',
      value: function renderChildren() {
        for (var i = 0; i < this.children.length; i += 1) {
          if (typeof this.children[i] === 'string') {
            this.adder.addText(this.children[i]);
          } // else { some_custom_method(); } here it's upto you how do you handle the nested components. For our example, we won't go into much details.
        }
      },
    },
    {
      key: 'render',
      value: function render() {
        this.renderChildren();
      },
    },
  ]);

  return Text;
})();

exports.default = Text;
