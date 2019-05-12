const excluded = [
  'display',
  'top',
  'right',
  'bottom',
  'left',
  'border',
  'borderTop',
  'borderRight',
  'borderBottom',
  'borderLeft',
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'padding',
  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',
  'position',
  'overflow',
  'alignItems',
  'justifyContent',
  'flexDirection',
  'flexWrap',
  'alignContent',
  'alignSelf',
  'aspectRatio',
  'flex',
  'flexBasis',
  'flexGrow',
  'flexShrink',
  'height',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'width',
];

const convertStyleSheet = style =>
  Object.entries(style).reduce((styleString, [propName, propValue]) => {
    if (excluded.includes(propName)) {
      console.log(propName, 'excluded');
      return styleString;
    }
    propName = propName.replace(
      /([A-Z])/g,
      matches => `-${matches[0].toLowerCase()}`
    );

    return `${styleString}${propName}:${propValue};`;
  }, '');

export default convertStyleSheet;
