const excluded = [
  "display",
  "top",
  "right",
  "bottom",
  "left",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "position",
  "overflow",
  "alignItems",
  "justifyContent",
  "flexDirection",
  "flexWrap",
  "alignContent",
  "alignSelf",
  "aspectRatio",
  "flex",
  "flexBasis",
  "flexGrow",
  "flexShrink",
  "height",
  "maxHeight",
  "maxWidth",
  "minHeight",
  "minWidth",
  "width"
];

const convertToPx = ["fontSize"];

const convertStyleSheet = (style: React.CSSProperties) =>
  Object.entries(style).reduce((styleString, [propName, propValue]) => {
    if (excluded.includes(propName)) {
      return styleString;
    }
    if (convertToPx.includes(propName)) {
      if (typeof propValue == "number") {
        propValue = `${propValue}px`;
      }
    }
    propName = propName.replace(
      /([A-Z])/g,
      matches => `-${matches[0].toLowerCase()}`
    );

    return `${styleString}${propName}:${propValue};`;
  }, "");

export default convertStyleSheet;
