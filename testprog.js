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
  setBackend,
} from './bin/';

setBackend('wx');

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
        <Window
          style={{ height: '25%', width: '25%', backgroundColor: 'blue' }}
        >
          <View
            style={{ height: '50%', width: '100%', backgroundColor: 'green' }}
          >
            <Button
              title="My button"
              onPress={() => console.log('Button pressed')}
            />
          </View>
          {/* <Button onPress={() => console.log("PRessed")} title="My button" /> */}
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('Test', <Example />);
