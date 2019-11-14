const yoga = require('yoga-layout');

const allRoot = yoga.Node.create();
const root = yoga.Node.create();

root.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
//root.setFlex(1);

const node1 = yoga.Node.create();

node1.setMeasureFunc((width, widthMode, height, heightMode) => {
  return { height: 20, width: 100 };
});

const node2 = yoga.Node.create();

node2.setMeasureFunc((width, widthMode, height, heightMode) => {
  return { height: 20, width: 100 };
});
node2.setFlex(1);

root.insertChild(node1, 0);
root.insertChild(node2, 1);
allRoot.insertChild(root, 0);

allRoot.calculateLayout(300, 600);

console.log(node1.getComputedLayout());
console.log(node2.getComputedLayout());
