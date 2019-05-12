import yoga from 'yoga-layout';

const mixedYogaValueTransformers = {
  display(value) {
    switch (value) {
      case 'flex':
        return yoga.DISPLAY_FLEX;
      case 'none':
        return yoga.DISPLAY_NONE;
    }
  },

  top: {
    functionName: 'setPosition',
    transform: value => [yoga.EDGE_TOP, value],
  },
  right: {
    functionName: 'setPosition',
    transform: value => [yoga.EDGE_RIGHT, value],
  },
  bottom: {
    functionName: 'setPosition',
    transform: value => [yoga.EDGE_BOTTOM, value],
  },
  left: {
    functionName: 'setPosition',
    transform: value => [yoga.EDGE_LEFT, value],
  },

  border: {
    functionName: 'setBorder',
    transform: value => [yoga.EDGE_ALL, value],
  },
  borderTop: {
    functionName: 'setBorder',
    transform: value => [yoga.EDGE_TOP, value],
  },
  borderRight: {
    functionName: 'setBorder',
    transform: value => [yoga.EDGE_RIGHT, value],
  },
  borderBottom: {
    functionName: 'setBorder',
    transform: value => [yoga.EDGE_BOTTOM, value],
  },
  borderLeft: {
    functionName: 'setBorder',
    transform: value => [yoga.EDGE_LEFT, value],
  },

  margin: {
    functionName: 'setMargin',
    transform: value => [yoga.EDGE_ALL, value],
  },
  marginTop: {
    functionName: 'setMargin',
    transform: value => [yoga.EDGE_TOP, value],
  },
  marginRight: {
    functionName: 'setMargin',
    transform: value => [yoga.EDGE_RIGHT, value],
  },
  marginBottom: {
    functionName: 'setMargin',
    transform: value => [yoga.EDGE_BOTTOM, value],
  },
  marginLeft: {
    functionName: 'setMargin',
    transform: value => [yoga.EDGE_LEFT, value],
  },

  padding: {
    functionName: 'setPadding',
    transform: value => [yoga.EDGE_ALL, value],
  },
  paddingTop: {
    functionName: 'setPadding',
    transform: value => [yoga.EDGE_TOP, value],
  },
  paddingRight: {
    functionName: 'setPadding',
    transform: value => [yoga.EDGE_RIGHT, value],
  },
  paddingBottom: {
    functionName: 'setPadding',
    transform: value => [yoga.EDGE_BOTTOM, value],
  },
  paddingLeft: {
    functionName: 'setPadding',
    transform: value => [yoga.EDGE_LEFT, value],
  },

  position: {
    functionName: 'setPositionType',
    transform(value) {
      switch (value) {
        case 'relative':
          return [yoga.POSITION_TYPE_RELATIVE];
        case 'absolute':
          return [yoga.POSITION_TYPE_ABSOLUTE];
      }
      throw new Error('Position not supported: ' + value);
    },
  },

  overflow(value) {
    switch (value) {
      case 'visible':
        return yoga.OVERFLOW_VISIBLE;
      case 'hidden':
        return yoga.OVERFLOW_HIDDEN;
      case 'scroll':
        return yoga.OVERFLOW_SCROLL;
    }
  },

  alignItems(value) {
    switch (value) {
      case 'auto':
        return yoga.ALIGN_AUTO;
      case 'flex-start':
        return yoga.ALIGN_FLEX_START;
      case 'center':
        return yoga.ALIGN_CENTER;
      case 'flex-end':
        return yoga.ALIGN_FLEX_END;
      case 'stretch':
        return yoga.ALIGN_STRETCH;
      case 'baseline':
        return yoga.ALIGN_BASELINE;
      case 'space-between':
        return yoga.ALIGN_SPACE_BETWEEN;
      case 'space-around':
        return yoga.ALIGN_SPACE_AROUND;
    }
  },

  alignSelf(value) {
    switch (value) {
      case 'auto':
        return yoga.ALIGN_AUTO;
      case 'flex-start':
        return yoga.ALIGN_FLEX_START;
      case 'center':
        return yoga.ALIGN_CENTER;
      case 'flex-end':
        return yoga.ALIGN_FLEX_END;
      case 'stretch':
        return yoga.ALIGN_STRETCH;
      case 'baseline':
        return yoga.ALIGN_BASELINE;
      case 'space-between':
        return yoga.ALIGN_SPACE_BETWEEN;
      case 'space-around':
        return yoga.ALIGN_SPACE_AROUND;
    }
  },

  alignContent(value) {
    switch (value) {
      case 'auto':
        return yoga.ALIGN_AUTO;
      case 'flex-start':
        return yoga.ALIGN_FLEX_START;
      case 'center':
        return yoga.ALIGN_CENTER;
      case 'flex-end':
        return yoga.ALIGN_FLEX_END;
      case 'stretch':
        return yoga.ALIGN_STRETCH;
      case 'baseline':
        return yoga.ALIGN_BASELINE;
      case 'space-between':
        return yoga.ALIGN_SPACE_BETWEEN;
      case 'space-around':
        return yoga.ALIGN_SPACE_AROUND;
    }
  },

  justifyContent(value) {
    switch (value) {
      case 'flex-start':
        return yoga.JUSTIFY_FLEX_START;
      case 'center':
        return yoga.JUSTIFY_CENTER;
      case 'flex-end':
        return yoga.JUSTIFY_FLEX_END;
      case 'space-between':
        return yoga.JUSTIFY_SPACE_BETWEEN;
      case 'space-around':
        return yoga.JUSTIFY_SPACE_AROUND;
      case 'space-evenly':
        return yoga.JUSTIFY_SPACE_EVENLY;
    }
  },

  flexDirection(value) {
    switch (value) {
      case 'column':
        return yoga.FLEX_DIRECTION_COLUMN;
      case 'row':
        return yoga.FLEX_DIRECTION_ROW;
    }
  },

  flexWrap(value) {
    switch (value) {
      case 'wrap':
        return yoga.WRAP_WRAP;
      case 'nowrap':
        return yoga.WRAP_NO_WRAP;
      case 'wrap-reverse':
        return yoga.WRAP_REVERSE;
    }
  },
};

export function getYogaValueTransformer(propertyName) {
  const transformer = mixedYogaValueTransformers[propertyName];
  if (!transformer) {
    return {
      transform: value => [value],
      functionName: getYogaNodeSetFunctionName(propertyName),
    };
  }

  if (typeof transformer === 'function') {
    return {
      transform: value => [transformer(value)],
      functionName: getYogaNodeSetFunctionName(propertyName),
    };
  }

  return transformer;
}

export function getYogaNodeSetFunctionName(propertyName) {
  return 'set' + propertyName[0].toUpperCase() + propertyName.substr(1);
}
