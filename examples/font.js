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
              <Area.Text x="10" y="20" style={{ fontSize: 14 }}>
                <Area.Text style={{ fontSize: 32 }}>Hi!</Area.Text>
                {'\n'}
                <Area.Text style={{ color: 'red' }}>
                  Test
                  <Area.Text style={{ fontStyle: 'italic' }}>ing</Area.Text>
                </Area.Text>
                {'\n'}
                <Area.Text style={{ fontFamily: 'Georgia' }}>Serif</Area.Text>
                {'\n'}
                <Area.Text
                  style={{
                    color: 'white',
                    fontFamily: 'Menlo',
                    backgroundColor: 'black',
                  }}
                >
                  Console
                </Area.Text>
                {'\n'}
                <Area.Text style={{ fontWeight: 'bold' }}>
                  A very bold statement!
                </Area.Text>
                {'\n'}
                <Area.Text>
                  This is an{' '}
                  <Area.Text
                    style={{
                      textUnderline: 'suggestion',
                      textUnderlineColor: 'spelling',
                    }}
                  >
                    error
                  </Area.Text>
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
