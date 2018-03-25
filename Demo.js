import React, { Component } from 'react';
import { render, Window, App, Text, Dialog, View } from './src/';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 500, h: 500 }} margined={true}>
          <View style={{ justifyContent: 'center' }}>
            <Text>Hello</Text>
          </View>
        </Window>
      </App>
    );
  }
}

render(<Example />);
