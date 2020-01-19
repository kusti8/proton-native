const qt = jest.genMockFromModule('node-qt-napi');

function desktopSize() {
  return { w: 1920, h: 1080 };
}

qt.desktopSize = desktopSize;

export default qt;
