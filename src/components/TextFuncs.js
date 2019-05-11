import convertStyleSheet from '../utils/convertStyleSheet';

export const TextFuncs = (upText, styleProp) => {
  const children = [];
  const text = [''];

  const updateText = () => {
    const childText = [];
    for (let i = 0; i < children.length; i++) {
      childText.push(children[i].text);
    }
    text[0] = `<span style="${convertStyleSheet(styleProp)}">${childText.join(
      ''
    )}</span>`;
    upText(text[0]);
  };

  const appendChild = child => {
    if (child.type != 'text' && child.type !== 'fullText') {
      throw new Error(`Can't add a child to Text that isn't a string or Text`);
    }
    children.push(child);
    updateText();
    console.log('New child', child);
  };

  const insertChild = (child, beforeChild) => {
    if (child.type !== 'text' && child.type !== 'fullText') {
      throw new Error(`Can't add a child to Text that isn't a string or Text`);
    }

    if (!children.includes(beforeChild)) {
      throw new Error(`Relative element does not exist`);
    }
    const i = children.indexOf(beforeChild);
    children.splice(i, 0, child);
    updateText();
  };

  const removeChild = child => {
    if (!children.includes(child)) {
      throw new Error(`Can't remove a child that's not added`);
    }
    const i = children.indexOf(child);
    children.splice(i, 1);
    updateText();
  };

  return {
    appendChild,
    insertChild,
    removeChild,
    children,
    updateText,
    text,
  };
};
