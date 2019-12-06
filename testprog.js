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
  Picker,
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
        {/*<Window style={{ height: 400, width: 500 }}>*/}
        <Window style={{ height: '25%', width: '25%' }}>
          <View style={{ alignItems: 'center' }}>
            <Button title="Hello" onPress={() => console.log('Pressed')} />
            <Picker onValueChange={(i, text) => console.log(i, text)}>
              <Picker.Item label="Item1" value="i1" />
              {this.state.a && <Picker.Item label="Item2" />}
            </Picker>
          </View>
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('Test', <Example />);
