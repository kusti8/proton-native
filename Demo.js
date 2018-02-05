import React, { Component } from 'react';

import { Window, App, Text, render, Button, Box, TextInput, ColorButton } from './src/';

class A extends Component {
  state = { name: true };
  render() {
    return (
      <App>
        <Window name="Hi" height={640} width={480} menuBar={true}>
          <Box vertical={this.state.name} padded={true}>
            <Button
              stretchy={false}
              onClicked={() => this.setState({ name: !this.state.name })}
            >
              Hello
            </Button>
            <ColorButton stretchy={false} color='white' onChanged={color => console.log(color)}/>
            <TextInput multiline={false} stretchy={false} secure={true} onChanged={text => console.log(text)}>My name is Gustav!</TextInput>
          </Box>
        </Window>
      </App>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<A />);
