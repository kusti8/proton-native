import propChecker from '../utils/propChecker';
import { disconnectDevtools } from '../devtools';
import qt from 'node-qt-napi';
import { Container } from './Container';

export default props => {
  const propTypes = {};
  const defaultProps = {};

  const element = new qt.QApplication();

  props = propChecker(props, propTypes, defaultProps, 'Root');

  const containerProps = Container(() => {}, () => {});

  const quit = () => {
    for (let i = 0; i < containerProps.children[0].children.length; i++) {
      containerProps.children[0].children[i].element.del();
    }
  };

  const interval = setInterval(() => element.processEvents(), 1); // fix this

  const traverseYoga = host => {
    const queue = [host];
    while (queue.length) {
      const next = queue.pop();
      console.log(next.element);
      if (next && next.applyYoga) {
        let root = true;
        if (next.parent && next.parent.applyYoga) {
          root = false;
        } else {
          root = {
            h: next.parent.element.height(),
            w: next.parent.element.width(),
          };
        }
        next.applyYoga(root);
      }
      if (next && next.type == 'fullText' && next.element.adjustSize) {
        next.element.adjustSize();
      }
      if (next && next.children) queue.push(...next.children);
    }
  };

  const afterCommit = host => {
    console.log('After commit');
    traverseYoga(host);
  };

  return {
    ...containerProps,
    element,
    afterCommit,
    interval,
    quit,
  };
};
