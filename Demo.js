import React, { Component } from 'react';

import { render, Window, App, TextInput, Dialog } from './src/';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 500, h: 500 }} margined={true}>
          <TextInput stretchy={false} />
        </Window>
      </App>
    );
  }
}

render(<Example />);
