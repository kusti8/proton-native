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
              <Area.Text x="10" y="100" style={{ color: 'red' }}>
                <Area.Text style={{ color: 'red', fontSize: 20 }}>
                  Hi!
                </Area.Text>
                {'\n'}
                Test{'\n'}
                <Area.Text style={{ color: 'black', fontFamily: 'Arial' }}>
                  Sans serif
                </Area.Text>
              </Area.Text>
            </Area>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
