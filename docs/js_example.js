import React, { Component } from 'react';

import { render, Window, App, Button } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window style={{ height: '50%', width: '10%' }}>
          <View>
            <Button title="Hello" onPress={() => console.log('Pressed')} />
            <Picker onValueChange={(i, text) => console.log(i, text)}>
              <Picker.Item label="Item1" value="i1" />
            </Picker>
          </View>
        </Window>
      </App>
    );
  }
}

render(<Example />);
