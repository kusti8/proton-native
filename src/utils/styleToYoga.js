import yoga from 'yoga-layout';

export let styleToFuncMap = {
  alignContent: alignContent,
  alignItems: alignItems,
  alignSelf: alignSelf,

  aspectRatio: aspectRatio,

  borderBottomWidth: borderBottomWidth,
  borderEndWidth: borderEndWidth,
  borderLeftWidth: borderLeftWidth,
  borderRightWidth: borderRightWidth,
  borderStartWidth: borderStartWidth,
  borderTopWidth: borderTopWidth,
  borderWidth: borderWidth,

  display: display,
  flex: flex,
  flexBasis: flexBasis,
  flexDirection: flexDirection,
  flexGrow: flexGrow,
  flexShrink: flexShrink,
  flexWrap: flexWrap,
  height: height,
  justifyContent: justifyContent,

  marginBottom: marginBottom,
  marginEnd: marginEnd,
  marginLeft: marginLeft,
  marginRight: marginRight,
  marginStart: marginStart,
  marginTop: marginTop,
  marginHorizontal: marginHorizontal,
  marginVertical: marginVertical,
  margin: margin,

  maxHeight: maxHeight,
  maxWidth: maxWidth,
  minHeight: minHeight,
  minWidth: minWidth,

  paddingBottom: paddingBottom,
  paddingEnd: paddingEnd,
  paddingLeft: paddingLeft,
  paddingRight: paddingRight,
  paddingStart: paddingStart,
  paddingTop: paddingTop,
  paddingHorizontal: paddingHorizontal,
  paddingVertical: paddingVertical,
  padding: padding,

  position: position,
  bottom: bottom,
  end: end,
  left: left,
  right: right,
  start: start,
  top: top,

  width: width,
};

// Constant maps

let alignMap = {
  auto: yoga.ALIGN_AUTO,
  'flex-start': yoga.ALIGN_FLEX_START,
  'flex-end': yoga.ALIGN_FLEX_END,
  center: yoga.ALIGN_CENTER,
  stretch: yoga.ALIGN_STRETCH,
  'space-between': yoga.ALIGN_SPACE_BETWEEN,
  'space-around': yoga.ALIGN_SPACE_AROUND,
  baseline: yoga.ALIGN_BASELINE,
};

let displayMap = {
  none: yoga.DISPLAY_NONE,
  flex: yoga.DISPLAY_FLEX,
};

let flexDirectionMap = {
  row: yoga.FLEX_DIRECTION_ROW,
  'row-reverse': yoga.FLEX_DIRECTION_ROW_REVERSE,
  column: yoga.FLEX_DIRECTION_COLUMN,
  'column-reverse': yoga.FLEX_DIRECTION_COLUMN_REVERSE,
};

let flexWrapMap = {
  wrap: yoga.WRAP_WRAP,
  nowrap: yoga.WRAP_NO_WRAP,
};

let justifyContentMap = {
  'flex-start': yoga.JUSTIFY_FLEX_START,
  'flex-end': yoga.JUSTIFY_FLEX_END,
  center: yoga.JUSTIFY_CENTER,
  'space-between': yoga.JUSTIFY_SPACE_BETWEEN,
  'space-around': yoga.JUSTIFY_SPACE_AROUND,
  'space-evenly': yoga.JUSTIFY_SPACE_EVENLY,
};

let overflowMap = {
  visible: yoga.OVERFLOW_VISIBLE,
  hidden: yoga.OVERFLOW_HIDDEN,
  scroll: yoga.OVERFLOW_SCROLL,
};

let positionTypeMap = {
  absolute: yoga.POSITION_TYPE_ABSOLUTE,
  relative: yoga.POSITION_TYPE_RELATIVE,
};

export function alignContent(node, value) {
  if (value in alignMap) {
    node.setAlignContent(alignMap[value]);
  }
}

export function alignItems(node, value) {
  if (value in alignMap) {
    node.setAlignItems(alignMap[value]);
  }
}

export function alignSelf(node, value) {
  if (value in alignMap) {
    node.setAlignSelf(alignMap[value]);
  }
}

export function aspectRatio(node, value) {
  node.setAspectRatio(value);
}

export function borderBottomWidth(node, value) {
  node.setBorder(yoga.EDGE_BOTTOM, value);
}

export function borderEndWidth(node, value) {
  node.setBorder(yoga.EDGE_END, value);
}

export function borderLeftWidth(node, value) {
  node.setBorder(yoga.EDGE_LEFT, value);
}

export function borderRightWidth(node, value) {
  node.setBorder(yoga.EDGE_RIGHT, value);
}

export function borderStartWidth(node, value) {
  node.setBorder(yoga.EDGE_START, value);
}

export function borderTopWidth(node, value) {
  node.setBorder(yoga.EDGE_TOP, value);
}

export function borderWidth(node, value) {
  node.setBorder(yoga.EDGE_ALL, value);
}

export function display(node, value) {
  if (value in displayMap) {
    node.setDisplay(displayMap[value]);
  }
}

export function flex(node, value) {
  node.setFlex(value);
}

export function flexBasis(node, value) {
  node.setFlexBasis(value);
}

export function flexDirection(node, value) {
  if (value in flexDirectionMap) {
    node.setFlexDirection(flexDirectionMap[value]);
  }
}

export function flexGrow(node, value) {
  node.setFlexGrow(value);
}

export function flexShrink(node, value) {
  node.setFlexShrink(value);
}

export function flexWrap(node, value) {
  if (value in flexWrapMap) {
    node.setFlexWrap(flexWrapMap[value]);
  }
}

export function height(node, value) {
  node.setHeight(value);
}

export function justifyContent(node, value) {
  if (value in justifyContentMap) {
    node.setJustifyContent(justifyContentMap[value]);
  }
}

export function marginBottom(node, value) {
  node.setMargin(yoga.EDGE_BOTTOM, value);
}

export function marginEnd(node, value) {
  node.setMargin(yoga.EDGE_END, value);
}

export function marginLeft(node, value) {
  node.setMargin(yoga.EDGE_LEFT, value);
}

export function marginRight(node, value) {
  node.setMargin(yoga.EDGE_RIGHT, value);
}

export function marginStart(node, value) {
  node.setMargin(yoga.EDGE_START, value);
}

export function marginTop(node, value) {
  node.setMargin(yoga.EDGE_TOP, value);
}

export function marginHorizontal(node, value) {
  node.setMargin(yoga.EDGE_HORIZONTAL, value);
}

export function marginVertical(node, value) {
  node.setMargin(yoga.EDGE_VERTICAL, value);
}

export function margin(node, value) {
  node.setMargin(yoga.EDGE_ALL, value);
}

export function maxHeight(node, value) {
  node.setMaxHeight(value);
}

export function maxWidth(node, value) {
  node.setMaxWidth(value);
}

export function minHeight(node, value) {
  node.setMinHeight(value);
}

export function minWidth(node, value) {
  node.setMinWidth(value);
}

export function overflow(node, value) {
  if (value in overflowMap) {
    node.setOverflow(overflowMap[value]);
  }
}

export function paddingBottom(node, value) {
  node.setPadding(yoga.EDGE_BOTTOM, value);
}

export function paddingEnd(node, value) {
  node.setPadding(yoga.EDGE_END, value);
}

export function paddingLeft(node, value) {
  node.setPadding(yoga.EDGE_LEFT, value);
}

export function paddingRight(node, value) {
  node.setPadding(yoga.EDGE_RIGHT, value);
}

export function paddingStart(node, value) {
  node.setPadding(yoga.EDGE_START, value);
}

export function paddingTop(node, value) {
  node.setPadding(yoga.EDGE_TOP, value);
}

export function paddingHorizontal(node, value) {
  node.setPadding(yoga.EDGE_HORIZONTAL, value);
}

export function paddingVertical(node, value) {
  node.setPadding(yoga.EDGE_VERTICAL, value);
}

export function padding(node, value) {
  node.setPadding(yoga.EDGE_ALL, value);
}

export function position(node, value) {
  if (value in positionTypeMap) {
    node.setPositionType(positionTypeMap[value]);
  }
}

export function bottom(node, value) {
  node.setPosition(yoga.EDGE_BOTTOM, value);
}

export function end(node, value) {
  node.setPosition(yoga.EDGE_END, value);
}

export function left(node, value) {
  node.setPosition(yoga.EDGE_LEFT, value);
}

export function right(node, value) {
  node.setPosition(yoga.EDGE_RIGHT, value);
}

export function start(node, value) {
  node.setPosition(yoga.EDGE_START, value);
}

export function top(node, value) {
  node.setPosition(yoga.EDGE_TOP, value);
}

export function width(node, value) {
  node.setWidth(value);
}
