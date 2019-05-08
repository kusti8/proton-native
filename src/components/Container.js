export const Container = (addChild, deleteChild) => {
  const children = [];

  const appendChild = child => {
    children.push(child);
    addChild(child);
  };

  const insertChild = (child, beforeChild) => {
    if (!children.includes(beforeChild)) {
      throw new Error(`Relative element does not exist`);
    }

    const i = children.indexOf(beforeChild);
    children.splice(i, 0, child);
    addChild(child);
  };

  const removeChild = child => {
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
    children,
  };
};
