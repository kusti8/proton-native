import React, { Component } from 'react';

import { App, AppRegistry, Window, View } from './src/';

class Example extends Component {
  render() {
    return (
      <App>
        <Window>
          <View style={{ backgroundColor: 'black' }} />
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('Test', <Example />);
