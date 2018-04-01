import React, { Component } from 'react';
import { render, Window, App, Box, Text, View } from './src/';

class Example extends Component {
  state = { style: { justifyContent: 'center' } };
  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 500, h: 500 }} margined={true}>
          <View style={this.state.style}>
            <View
              style={{
                justifyContent: 'flex-start',
                backgroundColor: 'red',
                height: 100,
                width: 100,
              }}
            >
              <Text>Hi</Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                backgroundColor: 'blue',
                height: 100,
                width: 100,
              }}
            >
              <Text>Hello</Text>
            </View>
          </View>
        </Window>
      </App>
    );
  }
}

render(<Example />);
