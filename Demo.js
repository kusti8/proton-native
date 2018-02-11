import React, { Component } from 'react';

import { render, Window, App, Box, Button, TextInput, Separator } from './src';

class Example extends Component {
  state = {text: 'asds'}
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
          <Box>
            <Button onClicked={() => this.setState({text: ''})}>Reset</Button>
            <Separator />
            <TextInput>{this.state.text}</TextInput>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
