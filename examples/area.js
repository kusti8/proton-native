import React, { Component } from 'react';
import {
  render,
  Window,
  App,
  Box,
  Menu,
  Button,
  Slider,
  Area,
  Rectangle,
  Line,
  Arc,
  Circle,
  Path,
} from '../src/';

class Example extends Component {
  state = { bool: false, val: 0 };

  render() {
    return (
      <App>
        <Menu>
          <Menu.Item type="Quit" />
        </Menu>
        <Window title="Test" size={{ w: 400, h: 400 }} margined={true}>
          <Box>
            <Area
              // onKeyUp={(area, evt) => console.log("up", evt.getKey())}
              // onKeyDown={(area, evt) => console.log("down", evt.getKey())}
              // onMouseEnter={area => console.log('enter')}
              // onMouseLeave={area => console.log('leave')}
              // onMouseMove={(area, evt) => console.log(evt)}
              stretchy={false}
            >
              <Rectangle
                transform={`translate(-50% -50%)`}
                // transform={`scale(${(this.state.val/100.0)+0.5} ${(this.state.val/100.0)+0.5} 25 25)`}
                x="50%"
                y="50%"
                width="50%"
                height="50%"
                color={this.state.bool ? 'red' : 'blue'}
              />
              <Line
                transform={`rotate(${this.state.val * 3.6} 50% 50%)`}
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                color="green"
              />
              <Arc
                color={'red'}
                x="50%"
                y="50%"
                r="40%"
                start="0"
                sweep={this.state.val * 3.6}
              />
              <Circle
                color={`rgb(${255 - Math.round(this.state.val * 2.5)}, ${255 -
                  Math.round(this.state.val * 2.5)}, ${Math.round(
                  this.state.val * 2.5
                )})`}
                x="85%"
                y="85%"
                r="40"
              />
              <Rectangle
                // transform={this.state.bool ? 'matrix(1, 2, -1, 1, 80, 80)' : ''}
                transform={`skew(${(this.state.val / 100 - 0.5) * 2 * 30}, 0)`}
                x="30"
                y="15"
                width="10%"
                height="10%"
                color="blue"
              />
              {/*<Path 
                d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                // d="M10 80 Q 95 10 180 80"
                // d="M10 10 H 90 V 90 H 10 Z"
                color="red"/>*/}
            </Area>
            <Button
              onClick={() =>
                this.setState({
                  bool: !this.state.bool,
                })
              }
            >
              Toggle
            </Button>
            <Slider onChange={v => this.setState({ val: v })} />
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
