import { execSync } from 'child_process';
import fs from 'fs';
import { ROOT_NODE } from '../src/render';
const { toMatchImageSnapshot } = require('jest-image-snapshot');

const compareSnapshot = () => {
  jest.advanceTimersByTime(50);

  const image = execSync('xwd -display :34 -root | convert XWD:- PNG:-');
  expect(image).toMatchImageSnapshot();
};

const clearShown = () => {
  ROOT_NODE.quit();
};

export { compareSnapshot, clearShown };
