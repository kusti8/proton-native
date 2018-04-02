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
            <Area stretchy={false}>
              <AreaRectangle
                transform={`rotate(${this.state.val * (360.0 / 100)} 50% 50%)`}
                x="0"
                y="0"
                width="50%"
                height={200}
                color={this.state.color}
              />
              <AreaLine x1="0" y1="0" x2="100%" y2="100%" color="0x00ff00" />
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
