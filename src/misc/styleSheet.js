const StyleSheet = {
  create: obj => obj,
  flatten: (...objs) => Object.assign(...objs),
  absoluteFill: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

export default StyleSheet;
