import React, { Component } from 'react';

import { App, AppRegistry, Window, View } from './src/';

class Example2 extends Component {
  render() {
    return <View />;
  }
}

class Example extends Component {
  render() {
    return (
      <App>
        <Window>
          <View style={{ backgroundColor: 'black', flex: 1, margin: 30 }}>
            <Example2 />
          </View>
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('Test', <Example />);
