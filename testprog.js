import React, { Component } from 'react';

import {
  App,
  AppRegistry,
  Window,
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  Image,
  TextInput,
} from './src/';

class Example extends Component {
  state = {
    test: 'dsdasdsa',
    a: true,
  };
  componentDidMount() {
    //setTimeout(() => this.setState({ test: "dsawewwww" }), 3000);
    //setTimeout(() => this.setState({ a: false }), 3000);
  }
  render() {
    return (
      <App>
        <Window style={{ height: '50%', width: '10%' }}>
          <View>
            <Button title="Hello" onPress={() => console.log('Pressed')} />
          </View>
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('Test', <Example />);
