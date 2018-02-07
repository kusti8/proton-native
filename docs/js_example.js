import React, { Component } from 'react';

import { render, Window, App, Button } from 'reactor-native';

class Example extends Component {
  state = { name: true };
  render() {
    return (
      <App>
        <Window name="Example" height={300} width={300} menuBar={false}>
          <Button stretchy={false} onClicked={() => console.log('Hello')}>
            Button
          </Button>
        </Window>
      </App>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<Example />);
