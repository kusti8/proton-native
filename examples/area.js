import React, { Component } from 'react';
import { render, Window, App, Box, Menu, Button, Slider, Area } from '../src/';

class Example extends Component {
  state = { bool: false, val: 40, dragging: false, pos: { x: 10, y: 10 } };

  render() {
    return (
      <App>
        <Menu>
          <Menu.Item type="Quit" />
        </Menu>
        <Window title="Test" size={{ w: 600, h: 600 }} margined={true}>
          <Box>
            <Area
              // onKeyUp={e => {
              //   console.log('up', e.key);
              //   return true;
              // }}
              // onKeyDown={e => {
              //   console.log('down', e.key);
              //   return true;
              // }}
              // onMouseEnter={() => console.log('enter')}
              // onMouseLeave={() => console.log('leave')}
              onMouseMove={e => {
                if (e.buttons.includes(1)) {
                  if (this.state.dragging)
                    this.setState({ pos: { x: e.x, y: e.y } });
                }
              }}
              onMouseUp={e => {
                this.setState({ dragging: false });
              }}
              onMouseDown={e => {
                if (
                  Math.sqrt(
                    Math.pow(this.state.pos.x - e.x, 2) +
                      Math.pow(this.state.pos.y - e.y, 2)
                  ) < 40
                ) {
                  this.setState({ dragging: true });
                }
              }}
              stretchy={false}
              strokeWidth="4"
            >
              <Area.Group
                stroke="black"
                strokeWidth="10"
                transform="translate(200, 50)"
              >
                <Area.Rectangle
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="red"
                />
                <Area.Rectangle
                  x="100"
                  y="0"
                  width="100"
                  height="100"
                  fill="blue"
                />
              </Area.Group>
              <Area.Rectangle
                transform={`translate(-50%, -50%)`}
                // transform={`scale(1, 10%, 20%)`}
                // transform={`scale(${this.state.val / 100.0 + 0.5}, ${this.state.val/100.0 +0.5}, 25, 25)`}
                x="50%"
                y="50%"
                width="25%"
                height="25%"
                stroke="black"
                strokeWidth="7"
                fill={this.state.bool ? 'red' : 'blue'}
              />
              <Area.Line
                transform={`rotate(${this.state.val * 3.6})`}
                x1="78%"
                y1="5%"
                x2="98%"
                y2="25%"
                stroke="green"
              />
              <Area.Arc
                stroke={'red'}
                x="50%"
                y="50%"
                r="40%"
                start="0"
                sweep={this.state.val * 3.6}
                strokeWidth="10"
                strokeLinecap={this.state.bool ? 'square' : 'round'}
              />
              <Area.Circle
                stroke={`rgb(${255 - Math.round(this.state.val * 2.5)}, ${255 -
                  Math.round(this.state.val * 2.5)}, ${Math.round(
                  this.state.val * 2.5
                )})`}
                strokeWidth="5"
                x={this.state.pos.x}
                y={this.state.pos.y}
                r="40"
              />
              <Area.Rectangle
                // transform={this.state.bool ? 'matrix(1, 2, -1, 1, 80, 80)' : ''}
                transform={`skew(${(this.state.val / 100 - 0.5) * 2 * 30}, 0)`}
                x="30"
                y="15"
                width="10%"
                height="10%"
                stroke="blue"
                fill="lime"
              />
              <Area.Path
                d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                // d="M10 80 Q 95 10 180 80"
                // d="M10 10 H 90 V 90 H 10 Z"
                stroke="red"
                transform="translate(0, 100)"
              />
              <Area.Rectangle
                transform={`scale(${0.5 + this.state.val / 100}, 0, 0)`}
                x="8%"
                y="85%"
                width="10%"
                height="10%"
                stroke="black"
              />
              <Area.Bezier
                transform="scale(0.5) translate(650, 100)"
                stroke="black"
                strokeWidth="8"
                x1="100"
                y1="250"
                cx1="15"
                cy1="10"
                x2="400"
                y2="250"
                cx2="495"
                cy2="5"
              />
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
            <Slider
              value={this.state.val}
              onChange={v => this.setState({ val: v })}
            />
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
