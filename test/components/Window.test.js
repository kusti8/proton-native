import React, { Component } from 'react';
import { App, Window, AppRegistry } from '../../src';
import qt from 'node-qt-napi';
jest.unmock('node-qt-napi');
const { toMatchImageSnapshot } = require('jest-image-snapshot');
import { compareSnapshot, clearShown } from '../index';
import { updateExpression } from '@babel/types';

describe('Window', () => {
  beforeAll(() => {
    expect.extend({ toMatchImageSnapshot });
  });
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    clearShown();
  });
  test('Basic window', () => {
    class Test extends Component {
      render() {
        return (
          <App>
            <Window style={{ height: 500, width: 500 }} />
          </App>
        );
      }
    }
    AppRegistry.registerComponent('Tests', <Test />);
    compareSnapshot();
  });
  test('Window size', () => {
    class Test extends Component {
      render() {
        return (
          <App>
            <Window style={{ height: 500, width: 1000 }} />
          </App>
        );
      }
    }
    AppRegistry.registerComponent('Tests', <Test />);
    compareSnapshot();
  });
  test('Window size percent', () => {
    class Test extends Component {
      render() {
        return (
          <App>
            <Window style={{ height: '100%', width: '50%' }} />
          </App>
        );
      }
    }
    AppRegistry.registerComponent('Tests', <Test />);
    compareSnapshot();
  });
  test('Window styling', () => {
    class Test extends Component {
      render() {
        return (
          <App>
            <Window
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: 'red',
                border: '10px dashed blue',
              }}
            />
          </App>
        );
      }
    }
    AppRegistry.registerComponent('Tests', <Test />);
    compareSnapshot();
  });
  test('Window handlers', () => {
    const fn = jest.fn();
    class Test extends Component {
      render() {
        return (
          <App>
            <Window
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'red',
                border: '10px dashed blue',
              }}
              onResize={size => fn(size)}
            />
          </App>
        );
      }
    }
    AppRegistry.registerComponent('Tests', <Test />);
    expect(fn).toHaveBeenCalledWith({ w: 1280, h: 720 });
  });
  test('Window removal state', () => {
    const stateChange = {
      callback: () => {},
    };
    class Test extends Component {
      state = {
        shown: true,
      };
      componentDidMount() {
        stateChange.callback = () => {
          this.setState({ shown: false });
        };
      }
      render() {
        return (
          <App>
            <Window
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: 'red',
                border: '10px dashed blue',
              }}
            />
            {this.state.shown && (
              <Window
                style={{
                  height: '50%',
                  width: '100%',
                  backgroundColor: 'blue',
                  border: '10px dashed red',
                }}
              />
            )}
          </App>
        );
      }
    }
    const component = <Test />;
    AppRegistry.registerComponent('Tests', component);
    compareSnapshot();
    stateChange.callback();
    compareSnapshot();
  });
  test('Window add state', () => {
    const stateChange = {
      callback: () => {},
    };
    class Test extends Component {
      state = {
        shown: false,
      };
      componentDidMount() {
        stateChange.callback = () => {
          this.setState({ shown: true });
        };
      }
      render() {
        return (
          <App>
            <Window
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: 'red',
                border: '10px dashed blue',
              }}
            />
            {this.state.shown && (
              <Window
                style={{
                  height: '50%',
                  width: '100%',
                  backgroundColor: 'blue',
                  border: '10px dashed red',
                }}
              />
            )}
          </App>
        );
      }
    }
    const component = <Test />;
    AppRegistry.registerComponent('Tests', component);
    compareSnapshot();
    stateChange.callback();
    compareSnapshot();
  });
  test('Window insert state', () => {
    const stateChange = {
      callback: () => {},
    };
    class Test extends Component {
      state = {
        shown: false,
      };
      componentDidMount() {
        stateChange.callback = () => {
          this.setState({ shown: true });
        };
      }
      render() {
        return (
          <App>
            <Window
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: 'red',
                border: '10px dashed blue',
              }}
            />
            {this.state.shown && (
              <Window
                style={{
                  height: '10%',
                  width: '10%',
                  backgroundColor: 'blue',
                  border: '10px dashed red',
                }}
              />
            )}
            <Window
              style={{
                height: '25%',
                width: '75%',
                backgroundColor: 'orange',
                border: '10px dashed blue',
              }}
            />
          </App>
        );
      }
    }
    const component = <Test />;
    AppRegistry.registerComponent('Tests', component);
    compareSnapshot();
    stateChange.callback();
    compareSnapshot();
  });
  test('Window update state', () => {
    const stateChange = {
      callback: () => {},
    };
    class Test extends Component {
      state = {
        style: {
          backgroundColor: 'white',
          height: '20%',
          width: '20%',
        },
      };
      componentDidMount() {
        stateChange.callback = () => {
          this.setState({
            style: {
              backgroundColor: 'green',
              height: '50%',
              width: '50%',
            },
          });
        };
      }
      render() {
        return (
          <App>
            <Window
              style={{
                height: '100%',
                width: '50%',
                backgroundColor: 'red',
                border: '10px dashed blue',
              }}
            />
            <Window style={this.state.style} />
          </App>
        );
      }
    }
    const component = <Test />;
    AppRegistry.registerComponent('Tests', component);
    compareSnapshot();
    stateChange.callback();
    compareSnapshot();
  });
});
