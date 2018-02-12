import React, { Component } from 'react';

import { render, Window, App, Form, TextInput } from './src/';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
          <Form>
            <TextInput stretchy={false} label="Username" />
            <TextInput stretchy={false} label="Password" secure={true} />
          </Form>
        </Window>
      </App>
    );
  }
}

render(<Example />);
