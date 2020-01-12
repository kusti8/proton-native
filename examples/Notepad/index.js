import React, { Component } from 'react';
import fs from 'fs';
import { App, AppRegistry, Window, TextInput, View } from 'proton-native';

class Notepad extends Component {
  state = { text: '' };

  shouldComponentUpdate(nextProps, nextState) {
    if (typeof nextState.text === 'string') return false;
    // nextState is set from input
    else return true; // nextState is set from file
  }

  render() {
    return (
      <App>
        <Window>
          <View style={{ flex: 1 }}>
            <TextInput
              onChangeText={text => this.setState({ text })}
              value={this.state.text}
              style={{ flex: 1 }}
              multiline
            />
          </View>
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('notepad', <Notepad />);
