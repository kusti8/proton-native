import React, { Component } from 'react';

import { Window, App, Text, render, Button, VerticalBox } from './';

class A extends Component {
    state = {name: true}
  render () {
      const textOrButton = this.state.name ? (<Text>Hello!</Text>) : (<Button onClicked={() => {}}>HI!</Button>)
    return (
      <App>
        <Window title="Hi" height={640} width={480} menuBar={true}>
            <VerticalBox>
                <Button onClicked={() => this.setState({name: !this.state.name})}>Hello</Button>
                {textOrButton}
            </VerticalBox>
        </Window>
      </App>
    );
  }
}

// This will create a file 'text.docx' in the current directory!
render(<A />);