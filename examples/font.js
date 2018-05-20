import React, { Component } from 'react';
import { render, Window, App, Entry, Box, Area } from '../src';

class Example extends Component {
  render() {
    return (
      <App>
        <Window
          title="Proton Native Rocks!"
          size={{ w: 300, h: 300 }}
          menuBar={false}
          margined
        >
          <Box>
            <Area>
              <Area.Text color="red">
                sasad
                <Area.Text fontSize="20">other</Area.Text>
              </Area.Text>
            </Area>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
