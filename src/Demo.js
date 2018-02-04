import React, { Component } from 'react';

import { Window, App, Text, render, Button, Box } from './';

class A extends Component {
  state = { name: true };
  render() {
    return (
      <App>
        <Window title="Hi" height={640} width={480} menuBar={true}>
          <Box vertical={this.state.name}>
            <Button
              stretchy={false}
              onClicked={() => this.setState({ name: !this.state.name })}
            >
              Hello
            </Button>
            <Text visible={true}>My name is Gustav!</Text>
          </Box>
        </Window>
      </App>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<A />);
