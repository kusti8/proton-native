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
  Picker,
  ProgressBar,
} from './src/';

class A extends Component {
  state = { value: -1 };
  render() {
    return (
      <App>
        <Window name="Hi" height={640} width={480} margined={true}>
          <Grid padded={true}>
            <Button
              onClicked={() => this.setState({ value: this.state.value + 1 })}
              row={0}
              column={0}
            >
              Hello
            </Button>
            <ProgressBar column={1} value={this.state.value} />
            <TextInput onChanged={text => console.log(text)} row={0} column={2}>
              My name is Gustav!
            </TextInput>
            <Picker
              editable={true}
              onChanged={loc => console.log(loc)}
              selected={1}
              column={3}
            >
              <Picker.Item>Hello</Picker.Item>
              <Picker.Item>Hi</Picker.Item>
            </Picker>
          </Grid>
        </Window>
      </App>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<A />);
