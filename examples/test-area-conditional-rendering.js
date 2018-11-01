// When proper testing is implemented, migrate this

import React, { Component } from 'react';

import { render, Window, Box, App, Text, Area, Button } from '../src/';

class Example extends Component {
  state = { flag: false };

  render() {
    const flagText = 'Flag is ' + (this.state.flag ? 'Set' : 'Not Set');

    return (
      <App>
        <Window title="Test" size={{ w: 500, h: 500 }} margined={true}>
          <Box padded>
            <Button
              onClick={() => this.setState({ flag: !this.state.flag })}
              stretchy={false}
            >
              Toggle Flag
            </Button>
            <Text stretchy={false}>{flagText}</Text>
            <Area>
              <Area.Text>
                {this.state.flag && (
                  <Area.Text style={{ fontStyle: 'italic' }}>
                    Italic
                    {'\n'}
                  </Area.Text>
                )}
                {flagText}
                {'\n'}
                {this.state.flag && (
                  <Area.Text style={{ color: 'red' }}>Red</Area.Text>
                )}
              </Area.Text>
              <Area.Group>
                {this.state.flag && (
                  <Area.Circle fill="red" x="100" y="100" r="20" />
                )}
                <Area.Circle fill="green" x="150" y="100" r="20" />
                {this.state.flag && (
                  <Area.Circle fill="blue" x="200" y="100" r="20" />
                )}
              </Area.Group>
            </Area>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
