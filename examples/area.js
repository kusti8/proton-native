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
  Text,
} from 'proton-native';

class Example extends Component {
  state = {
    bool: false,
    val: 40,
    dragging: false,
    pos: { x: 50, y: 220 },
    areaHeight: '',
  };

  constructor(props) {
    super(props);
    this.onAreaSizeChange = this.onAreaSizeChange.bind(this);
  }

  onAreaSizeChange({ height: areaHeight }) {
    this.setState({
      areaHeight,
    });
  }

  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 600, h: 650 }} margined={true}>
          <Box padded>
            <Text stretchy={false}>Try dragging the circle!</Text>
            <Text stretchy={false}>{`Area height: ${
              this.state.areaHeight
            } px`}</Text>
            <Area
              onSizeChange={this.onAreaSizeChange}
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
              {this.state.bool && (
                <Area.Path
                  d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"
                  // d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
                  // d="M10 80 Q 95 10 180 80"
                  // d="M10 10 H 90 V 90 H 10 Z"
                  // d="M10 315
                  //    L 110 215
                  //    A 30 50 0 0 1 162.55 162.45
                  //    L 172.55 152.45
                  //    A 30 50 -45 0 1 215.1 109.9
                  //    L 315 10"
                  fill="grey"
                  transform="scale(2.2) translate(60, 90)"
                />
              )}
              <Area.Rectangle
                transform={`scale(${0.5 + this.state.val / 100}, 50%, 50%)`}
                x="8%"
                y="75%"
                width="10%"
                height="10%"
                stroke="black"
              />
              <Area.Bezier
                transform="scale(0.4) translate(70, 180)"
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
              <Area.Path
                transform="scale(0.4) translate(50, 700)"
                fill="#b4edb4"
                fillRule="evenodd"
                stroke="#7DD37D"
                strokeWidth="8"
                d="M231.645,236.645H8.355V13.355h223.29 V236.645z M197.914,202.914H42.086V47.086h155.828V202.914z"
              />
            </Area>
            <Button
              stretchy={false}
              onClick={() =>
                this.setState({
                  bool: !this.state.bool,
                })
              }
            >
              Toggle
            </Button>
            <Slider
              stretchy={false}
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
