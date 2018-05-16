import React, { Component } from 'react';

import { render, Window, App, Slider, Box, Button } from './src/';

class Example extends Component {
  state = { min: 20 };
  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 500, h: 500 }} margined={true}>
          <Box>
            <Slider stretchy={false} min={this.state.min} max={25} />
            <Button onClick={() => this.setState({ min: 10 })} />
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
