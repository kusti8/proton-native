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
  AreaRectangle,
  AreaLine,
  AreaArc,
} from '../src/';

class Example extends Component {
  state = { color: '0x0000ff', val: 0 };

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
              <AreaRectangle
                transform={`translate(-50% -50%)`}
                // transform={`scale(${(this.state.val/100.0)+0.5} ${(this.state.val/100.0)+0.5} 25 25)`}
                x="50%"
                y="50%"
                width="50%"
                height="50%"
                color={this.state.color}
              />
              <AreaLine
                transform={`rotate(${this.state.val * 3.6} 50% 50%)`}
                x1="0"
                y1="0"
                x2="100%"
                y2="100%"
                color="0x00ff00"
              />
              <AreaArc
                color={this.state.color / 2}
                x="50%"
                y="50%"
                r="40%"
                start="0"
                sweep={this.state.val * 3.6}
              />
            </Area>
            <Button
              onClick={() =>
                this.setState({
                  color:
                    this.state.color === '0x0000ff' ? '0xff0000' : '0x0000ff',
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
