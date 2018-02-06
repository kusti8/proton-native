import React, { Component } from 'react';

import { Window, App, Text, render, Button, Box, TextInput, ColorButton, Form } from './src/';

class A extends Component {
  state = { name: true };
  render() {
    return (
      <App>
        <Window name="Hi" height={640} width={480} menuBar={true}>
          <Form padded={true}>
            <Button
              stretchy={false}
              label="Don't press the button"
              onClicked={() => this.setState({ name: !this.state.name })}
            >
              Hello
            </Button>
            <TextInput label="Very secret" multiline={false} stretchy={false} secure={true} onChanged={text => console.log(text)}>My name is Gustav!</TextInput>
          </Form>
        </Window>
      </App>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<A />);
