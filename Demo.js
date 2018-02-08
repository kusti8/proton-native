import React, { Component } from 'react';

import {
  Window,
  App,
  Text,
  render,
  Button,
  Box,
  TextInput,
  ColorButton,
  Form,
  Grid,
  Slider,
} from './src/';

class A extends Component {
  state = { name: true };
  render() {
    return (
      <App>
        <Window name="Hi" height={640} width={480} margined={true}>
          <Grid padded={true}>
            <Button
              onClicked={() => this.setState({ name: !this.state.name })}
              row={0}
              column={0}
            >
              Hello
            </Button>
            <TextInput onChanged={text => console.log(text)} row={0} column={1}>
              My name is Gustav!
            </TextInput>
            <Slider
              onChanged={value => console.log(value)}
              row={0}
              column={2}
              span={{ x: 3, y: 1 }}
            />
          </Grid>
        </Window>
      </App>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<A />);
