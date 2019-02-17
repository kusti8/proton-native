import React, { Component } from 'react';
import { render, App, Window, Text } from '../src/';
jest.mock('libui-node');
const libui = require('libui-node');

describe('Window and loop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('All defaults', () => {
    class Test extends Component {
      render() {
        return (
          <App>
            <Window />
          </App>
        );
      }
    }
    render(<Test />);

    expect(libui.startLoop).toHaveBeenCalled();
    expect(libui.stopLoop).toHaveBeenCalled();
    expect(libui.UiWindow).toHaveBeenCalledWith('', 500, 500, true);
    expect(libui.classFuncs.UiWindow.show).toHaveBeenCalled();
    expect(libui.classFuncs.UiWindow.setChild).not.toHaveBeenCalled();
  }),
    test('All options and close', () => {
      const onClose = jest.fn();
      const onContentSizeChange = jest.fn();
      class Test extends Component {
        render() {
          return (
            <App>
              <Window
                title="Test title"
                size={{ w: 200, h: 600 }}
                menuBar={false}
                margined={true}
                fullscreen={true}
                borderless={true}
                lastWindow={false}
                onClose={onClose}
                onContentSizeChange={onContentSizeChange}
              />
            </App>
          );
        }
      }
      render(<Test />);

      expect(libui.UiWindow).toHaveBeenCalledWith(
        'Test title',
        200,
        600,
        false
      );
      expect(libui.classFuncs.UiWindow.fullscreen).toBe(true);
      expect(libui.classFuncs.UiWindow.margined).toBe(true);
      expect(libui.classFuncs.UiWindow.borderless).toBe(true);

      expect(onClose).toHaveBeenCalled();
      expect(libui.stopLoop).not.toHaveBeenCalled();
      expect(libui.classFuncs.UiWindow.close).toHaveBeenCalled();

      expect(onContentSizeChange).toHaveBeenCalled();
    }),
    test('Multiple children', () => {
      class Test extends Component {
        render() {
          return (
            <App>
              <Window>
                <Text>HI</Text>
                <Text>HI2</Text>
              </Window>
            </App>
          );
        }
      }
      expect(() => render(<Test />)).toThrowError();
    }),
    test('One child', () => {
      class Test extends Component {
        render() {
          return (
            <App>
              <Window>
                <Text>HI</Text>
              </Window>
            </App>
          );
        }
      }
      render(<Test />);

      expect(libui.classFuncs.UiWindow.setChild).toHaveBeenCalled();
    });
});
