const StyleSheet = {
  create: (obj: object) => obj,
  flatten: (obj1: object, ...objs: object[]) => Object.assign(obj1, ...objs),
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
};

export default StyleSheet;
