import React, { Component } from 'react';

import { Window, App, render, Menu, FontButton } from './src/';

class A extends Component {
  state = { value: -1 };
  render() {
    return (
      <App>
        <Menu label="HI">
          <Menu.Item onClicked={() => console.log('Hello')}>Hi</Menu.Item>
        </Menu>
        <Window name="Hi" height={640} width={480} margined={true}>
          <FontButton onChanged={s => console.log(s)} />
        </Window>
      </App>
    );
  }
}

render(<A />);
