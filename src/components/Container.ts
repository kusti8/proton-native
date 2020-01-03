export const Container = (
  addChild: (child: any) => void,
  deleteChild: (child: any) => void,
  inChild: (child: any, i: number, beforeChild: any) => void = addChild
) => {
  const children: any[] = [];

  const appendChild = (child: any) => {
    children.push(child);
    addChild(child);
    //if (child.element) child.element.show();
  };

  const insertChild = (child: any, beforeChild: any) => {
    if (!children.includes(beforeChild)) {
      throw new Error(`Relative element does not exist`);
    }

    const i = children.indexOf(beforeChild);
    children.splice(i, 0, child);
    inChild(child, i, beforeChild);
    //if (child.element) child.element.show();
  };

  const removeChild = (child: any) => {
    if (!children.includes(child)) {
      throw new Error(`Can't remove a child that's not added`);
    }
    const i = children.indexOf(child);
    children.splice(i, 1);
    deleteChild(child);
  };

  return {
    appendChild,
    insertChild,
    removeChild,
    children
  };
};
