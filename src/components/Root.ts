import propChecker from "../utils/propChecker";
import { disconnectDevtools } from "../devtools";
import { Container } from "./Container";
import { getBackend } from "../backends/index";
import { Component } from "./Base";

export interface Root {
  element: Component;
  afterCommit: (host: Root) => void;
}

export default (props: {}) => {
  const propTypes = {};
  const defaultProps = {};

  const AppElement = getBackend()["AppElement"];
  const element = new AppElement();

  props = propChecker(props, propTypes, defaultProps, "Root");

  const containerProps = Container(
    () => {},
    () => {}
  );

  const quit = () => {
    if (containerProps.children && containerProps.children.length) {
      for (let i = 0; i < containerProps.children[0].children.length; i++) {
        containerProps.children[0].children[i].element.close();
      }
    }
    disconnectDevtools();
  };

  const interval = setInterval(() => {
    if (containerProps.children && containerProps.children.length) {
      for (let i = 0; i < containerProps.children[0].children.length; i++) {
        if (!containerProps.children[0].children[i].element.getClosed)
          throw new Error(
            "Could not find Window or App. Did you forget to define one?"
          );
        const closed = containerProps.children[0].children[
          i
        ].element.getClosed();
        if (!closed) {
          element.runLoop();
          return;
        }
      }
    }
    quit();
    clearInterval(interval);
  }, 1); // fix this

  const traverseYoga = (host: Component) => {
    const queue = [host];
    while (queue.length) {
      const next = queue.pop();
      if (next && next.applyYoga) {
        let root = null;
        if (next.parent && next.parent.applyYoga) {
          root = null;
        } else if (
          typeof next.parent.element == "undefined" ||
          typeof next.parent.element.height == "undefined"
        ) {
          root = {
            h: next.element.height(),
            w: next.element.width()
          };
        } else {
          root = {
            h: next.parent.element.height(),
            w: next.parent.element.width()
          };
        }
        next.applyYoga(root, () => traverseYoga(host));
      }
      // if (next && next.type == 'fullText' && next.element.adjustSize) {
      //   next.element.adjustSize();
      // }
      if (next && next.children) queue.push(...next.children);
    }
  };

  const afterCommit = (host: Component) => {
    traverseYoga(host);
  };

  return {
    ...containerProps,
    element,
    afterCommit,
    interval,
    quit
  };
};
