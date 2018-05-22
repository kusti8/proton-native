import React, { Component } from 'react';
import {
  render,
  Window,
  App,
  Picker,
  Box,
  Area,
  FontButton,
  ColorButton,
  Checkbox,
} from '../src';

class Example extends Component {
  state = { align: 'left', color: 'blue', useFont: false, font: {} };

  render() {
    return (
      <App>
        <Window
          title="Proton Native Rocks!"
          size={{ w: 550, h: 450 }}
          menuBar={false}
          margined
        >
          <Box vertical={false} padded>
            <Box stretchy={false} padded>
              <FontButton
                stretchy={false}
                onChange={v => this.setState({ font: v })}
              />
              <ColorButton
                color="blue"
                stretchy={false}
                onChange={c =>
                  this.setState({
                    color: `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`,
                  })
                }
              />
              <Picker
                stretchy={false}
                selected={0}
                onSelect={v => {
                  switch (v) {
                    case 0:
                      return this.setState({ align: 'left' });
                    case 1:
                      return this.setState({ align: 'center' });
                    case 2:
                      return this.setState({ align: 'right' });
                  }
                }}
              >
                <Picker.Item>Left</Picker.Item>
                <Picker.Item>Center</Picker.Item>
                <Picker.Item>Right</Picker.Item>
              </Picker>
              <Checkbox
                stretchy={false}
                onToggle={v => this.setState({ useFont: v })}
              >
                {'Use Georgia (20pt) instead\nof font button'}
              </Checkbox>
            </Box>
            <Area>
              <Area.Text
                x="10"
                y="10"
                style={{
                  textAlign: this.state.align,
                  ...(this.state.useFont
                    ? { fontFamily: 'Georgia', fontSize: 20 }
                    : this.state.font),
                }}
              >
                <Area.Text style={{ color: this.state.color, fontSize: 32 }}>
                  Hi!
                </Area.Text>
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
