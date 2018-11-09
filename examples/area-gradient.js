import React, { Component } from 'react';
import { render, Window, App, Box, Menu, Area, Slider } from '../src/';

const linearGradient = Area.Gradient.createLinear(30, 30, 100, 100, {
  0: 'red',
  1: 'blue',
});

class Example extends Component {
  state = { v1: 250, v2: 250, v3: 80, v4: 100 };

  render() {
    const radialGradient = Area.Gradient.createRadial(
      this.state.v1,
      this.state.v2,
      this.state.v3,
      {
        0: 'orange',
        1: 'blue',
      }
    );

    const radialGradient2 = Area.Gradient.createRadial(
      300,
      100,
      300 + (this.state.v4 - 50) * 0.7,
      100,
      80,
      {
        0: 'white',
        1: 'black',
      }
    );

    return (
      <App>
        <Window title="Test" size={{ w: 500, h: 500 }} margined={true}>
          <Box padded>
            <Area>
              <Area.Rectangle
                x="20"
                y="20"
                width="110"
                height="110"
                stroke={linearGradient}
                strokeWidth="20"
                strokeOpacity="50"
                fill="yellow"
              />

              <Area.Rectangle
                x="200"
                y="200"
                width="100"
                height="100"
                fill={radialGradient}
                strokeWidth="30"
              />

              <Area.Circle x="300" y="100" r="80" fill={radialGradient2} />
            </Area>
            <Slider
              min={150}
              max={350}
              stretchy={false}
              value={this.state.v1}
              onChange={v => this.setState({ v1: v })}
            />
            <Slider
              min={150}
              max={350}
              stretchy={false}
              value={this.state.v2}
              onChange={v => this.setState({ v2: v })}
            />
            <Slider
              min={20}
              max={200}
              stretchy={false}
              value={this.state.v3}
              onChange={v => this.setState({ v3: v })}
            />
            <Slider
              min={0}
              max={100}
              stretchy={false}
              value={this.state.v4}
              onChange={v => this.setState({ v4: v })}
            />
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
