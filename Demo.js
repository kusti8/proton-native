import React, { Component } from 'react';
import { render, Window, App, Box, Text, View } from './src/';

class Example extends Component {
  state = { style: { justifyContent: 'center', padding: 8 } };
  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 500, h: 500 }} margined={true}>
          <View style={this.state.style}>
            <View
              style={{
                justifyContent: 'flex-start',
                flex: 1,
              }}
            >
              <Text>Hi</Text>
            </View>
            <View
              style={{
                justifyContent: 'flex-start',
                flex: 1,
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
