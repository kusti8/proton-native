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

setBackend('qt');

class Example extends Component {
  state = {
    test: 'dsdasdsa',
    a: true,
    mouseState: 'idle',
    x: null,
    y: null,
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
            onMouseEnter={() => this.setState({ mouseState: 'MOUSE ENTERED' })}
            onMouseLeave={() => this.setState({ mouseState: 'MOUSE LEFT' })}
            onMouseMove={event => this.setState(event.point)}
            style={{ height: '50%', width: '100%', backgroundColor: 'green' }}
          >
            <Button
              style={{ backgroundColor: 'white' }}
              onPress={() => console.log('PRessed')}
              title="My button"
            />
            <Text>{`Mouse state: ${this.state.mouseState} ${this.state.x} ${this.state.y}`}</Text>
          </View>
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('Test', <Example />);
