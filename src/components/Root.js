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

  const interval = setInterval(() => element.processEvents(), 0); // fix this

  const traverseYoga = host => {
    const queue = [host];
    while (queue.length) {
      const next = queue.pop();
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
      if (next) queue.push(...next.children);
    }
  };

  const afterCommit = host => {
    traverseYoga(host);
  };

  return {
    ...containerProps,
    element,
    afterCommit,
  };
};
