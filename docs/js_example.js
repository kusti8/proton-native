import React, { Component } from 'react';

import { render, Window, App, Button } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={300} width={300} menuBar={false}>
          <Button stretchy={false} onClick={() => console.log('Hello')}>
            Button
          </Button>
        </Window>
      </App>
    );
  }
}

render(<Example />);
