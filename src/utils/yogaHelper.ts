import * as yoga from "yoga-layout-prebuilt";

const mixedYogaValueTransformers = {
  display(value: "flex" | "none") {
    switch (value) {
      case "flex":
        return yoga.DISPLAY_FLEX;
      case "none":
        return yoga.DISPLAY_NONE;
    }
  },

  top: {
    functionName: "setPosition",
    transform: (value: any) => [yoga.EDGE_TOP, value]
  },
  right: {
    functionName: "setPosition",
    transform: (value: any) => [yoga.EDGE_RIGHT, value]
  },
  bottom: {
    functionName: "setPosition",
    transform: (value: any) => [yoga.EDGE_BOTTOM, value]
  },
  left: {
    functionName: "setPosition",
    transform: (value: any) => [yoga.EDGE_LEFT, value]
  },

  border: {
    functionName: "",
    transform: (value: any) => [yoga.EDGE_ALL, value]
  },
  borderTop: {
    functionName: "",
    transform: (value: any) => [yoga.EDGE_TOP, value]
  },
  borderRight: {
    functionName: "",
    transform: (value: any) => [yoga.EDGE_RIGHT, value]
  },
  borderBottom: {
    functionName: "",
    transform: (value: any) => [yoga.EDGE_BOTTOM, value]
  },
  borderLeft: {
    functionName: "",
    transform: (value: any) => [yoga.EDGE_LEFT, value]
  },

  margin: {
    functionName: "setMargin",
    transform: (value: any) => [yoga.EDGE_ALL, value]
  },
  marginTop: {
    functionName: "setMargin",
    transform: (value: any) => [yoga.EDGE_TOP, value]
  },
  marginRight: {
    functionName: "setMargin",
    transform: (value: any) => [yoga.EDGE_RIGHT, value]
  },
  marginBottom: {
    functionName: "setMargin",
    transform: (value: any) => [yoga.EDGE_BOTTOM, value]
  },
  marginLeft: {
    functionName: "setMargin",
    transform: (value: any) => [yoga.EDGE_LEFT, value]
  },

  padding: {
    functionName: "setPadding",
    transform: (value: any) => [yoga.EDGE_ALL, value]
  },
  paddingTop: {
    functionName: "setPadding",
    transform: (value: any) => [yoga.EDGE_TOP, value]
  },
  paddingRight: {
    functionName: "setPadding",
    transform: (value: any) => [yoga.EDGE_RIGHT, value]
  },
  paddingBottom: {
    functionName: "setPadding",
    transform: (value: any) => [yoga.EDGE_BOTTOM, value]
  },
  paddingLeft: {
    functionName: "setPadding",
    transform: (value: any) => [yoga.EDGE_LEFT, value]
  },

  position: {
    functionName: "setPositionType",
    transform(value: "relative" | "absolute") {
      switch (value) {
        case "relative":
          return [yoga.POSITION_TYPE_RELATIVE];
        case "absolute":
          return [yoga.POSITION_TYPE_ABSOLUTE];
      }
      throw new Error("Position not supported: " + value);
    }
  },

  overflow(value: "visible" | "hidden" | "scroll") {
    switch (value) {
      case "visible":
        return yoga.OVERFLOW_VISIBLE;
      case "hidden":
        return yoga.OVERFLOW_HIDDEN;
      case "scroll":
        return yoga.OVERFLOW_SCROLL;
    }
  },

  alignItems(
    value:
      | "auto"
      | "flex-start"
      | "center"
      | "flex-end"
      | "stretch"
      | "baseline"
      | "space-between"
      | "space-around"
  ) {
    switch (value) {
      case "auto":
        return yoga.ALIGN_AUTO;
      case "flex-start":
        return yoga.ALIGN_FLEX_START;
      case "center":
        return yoga.ALIGN_CENTER;
      case "flex-end":
        return yoga.ALIGN_FLEX_END;
      case "stretch":
        return yoga.ALIGN_STRETCH;
      case "baseline":
        return yoga.ALIGN_BASELINE;
      case "space-between":
        return yoga.ALIGN_SPACE_BETWEEN;
      case "space-around":
        return yoga.ALIGN_SPACE_AROUND;
    }
  },

  alignSelf(
    value:
      | "auto"
      | "flex-start"
      | "center"
      | "flex-end"
      | "stretch"
      | "baseline"
      | "space-between"
      | "space-around"
  ) {
    switch (value) {
      case "auto":
        return yoga.ALIGN_AUTO;
      case "flex-start":
        return yoga.ALIGN_FLEX_START;
      case "center":
        return yoga.ALIGN_CENTER;
      case "flex-end":
        return yoga.ALIGN_FLEX_END;
      case "stretch":
        return yoga.ALIGN_STRETCH;
      case "baseline":
        return yoga.ALIGN_BASELINE;
      case "space-between":
        return yoga.ALIGN_SPACE_BETWEEN;
      case "space-around":
        return yoga.ALIGN_SPACE_AROUND;
    }
  },

  alignContent(
    value:
      | "auto"
      | "flex-start"
      | "center"
      | "flex-end"
      | "stretch"
      | "baseline"
      | "space-between"
      | "space-around"
  ) {
    switch (value) {
      case "auto":
        return yoga.ALIGN_AUTO;
      case "flex-start":
        return yoga.ALIGN_FLEX_START;
      case "center":
        return yoga.ALIGN_CENTER;
      case "flex-end":
        return yoga.ALIGN_FLEX_END;
      case "stretch":
        return yoga.ALIGN_STRETCH;
      case "baseline":
        return yoga.ALIGN_BASELINE;
      case "space-between":
        return yoga.ALIGN_SPACE_BETWEEN;
      case "space-around":
        return yoga.ALIGN_SPACE_AROUND;
    }
  },

  justifyContent(
    value:
      | "flex-start"
      | "center"
      | "flex-end"
      | "space-between"
      | "space-around"
      | "space-evenly"
  ) {
    switch (value) {
      case "flex-start":
        return yoga.JUSTIFY_FLEX_START;
      case "center":
        return yoga.JUSTIFY_CENTER;
      case "flex-end":
        return yoga.JUSTIFY_FLEX_END;
      case "space-between":
        return yoga.JUSTIFY_SPACE_BETWEEN;
      case "space-around":
        return yoga.JUSTIFY_SPACE_AROUND;
      case "space-evenly":
        return yoga.JUSTIFY_SPACE_EVENLY;
    }
  },

  flexDirection(value: "column" | "row") {
    switch (value) {
      case "column":
        return yoga.FLEX_DIRECTION_COLUMN;
      case "row":
        return yoga.FLEX_DIRECTION_ROW;
    }
  },

  flexWrap(value: "wrap" | "nowrap" | "wrap-reverse") {
    switch (value) {
      case "wrap":
        return yoga.WRAP_WRAP;
      case "nowrap":
        return yoga.WRAP_NO_WRAP;
      case "wrap-reverse":
        return yoga.WRAP_WRAP_REVERSE;
    }
  }
};

export function getYogaValueTransformer(propertyName: string) {
  const transformer = (mixedYogaValueTransformers as any)[propertyName];
  if (!transformer) {
    return {
      transform: (value: any) => [value],
      functionName: getYogaNodeSetFunctionName(propertyName)
    };
  }

  if (typeof transformer === "function") {
    return {
      transform: (value: any) => [transformer(value)],
      functionName: getYogaNodeSetFunctionName(propertyName)
    };
  }

  return transformer;
}

export function getYogaNodeSetFunctionName(propertyName: string) {
  return "set" + propertyName[0].toUpperCase() + propertyName.substr(1);
}
