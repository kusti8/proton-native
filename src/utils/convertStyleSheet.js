const convertStyleSheet = style =>
  Object.entries(style).reduce((styleString, [propName, propValue]) => {
    propName = propName.replace(
      /([A-Z])/g,
      matches => `-${matches[0].toLowerCase()}`
    );
    return `${styleString}${propName}:${propValue};`;
  }, '');

export default convertStyleSheet;
