import React, { Component } from 'react';

import { App, AppRegistry, Window, View, Text } from './src/';

class Example extends Component {
  state = {
    test: 'dsdasdsa',
    a: false,
  };
  componentDidMount() {
    setTimeout(() => this.setState({ test: 'dsawewwww' }), 3000);
    setTimeout(() => this.setState({ a: true }), 3000);
  }
  render() {
    return (
      <App>
        <Window>
          <View
            style={{ backgroundColor: 'red', flex: 1, margin: 30, padding: 30 }}
          >
            <View
              style={{
                backgroundColor: 'black',
                flex: 1,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ backgroundColor: 'white', height: 10 }} />
              <View style={{ backgroundColor: 'yellow', height: 10 }} />
              <View style={{ backgroundColor: 'purple', height: 10 }} />
            </View>
            <View style={{ backgroundColor: 'green', flex: 1 }} />
            <View style={{ backgroundColor: 'blue', flex: 1 }} />
            <Text style={{ fontSize: 20 }}>
              {this.state.test}
              {this.state.a && <Text style={{ color: 'white' }}>Hello2</Text>}
            </Text>
          </View>
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('Test', <Example />);
