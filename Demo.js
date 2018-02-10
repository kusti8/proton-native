import React, { Component } from 'react';

import { Window, App, render, Menu } from './src/';

class A extends Component {
  state = { value: -1 };
  render() {
    return (
      <App>
        <Menu label="HI">
          <Menu.Item>Hi</Menu.Item>
        </Menu>
        <Window name="Hi" height={640} width={480} margined={true} />
      </App>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<A />);
