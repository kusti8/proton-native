"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parse = function parse(input) {
  function parseComponent(inputComponent) {
    var document = inputComponent.document;

    // Render all the children and props
    document.render();

    return inputComponent;
  }

  function toBuffer() {
    return parseComponent(input);
  }

  return {
    toBuffer: toBuffer
  };
};

exports.default = parse;