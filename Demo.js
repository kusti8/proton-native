import React, { Component } from 'react';

import { render, Window, App, Box, Button, TextInput } from './src';

class Example extends Component {
  render() {
    return (
      <App>
        <Window name="Example" height={500} width={500}>
          <Box>
            <Button>Hello</Button>
            <TextInput />
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
