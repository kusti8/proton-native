import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fs from 'fs';
import {
  render,
  App,
  Window,
  Area,
  Box,
  Button,
  Form,
  Menu,
  TextInput,
  Text,
  Slider,
  ColorButton,
} from '../src';

const columnWidth = num => 82 / (num * 2);

class Diagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heights: this.generateHeights(),
    };
  }

  generateHeights() {
    return new Array(2 * this.props.num)
      .fill(0)
      .map(v => -(Math.random() ** (10 - (3 + this.props.p / 8)) * 85));
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.p !== this.props.p || prevProps.num !== this.props.num) {
      this.setState({ heights: this.generateHeights() });
    }
  }

  render() {
    return (
      <Area
        onMouseDown={x => {
          if (x.count >= 2)
            this.setState({
              heights: this.generateHeights(),
            });
        }}
      >
        <Area.Rectangle x="0" y="0" width="100%" height="100%" fill="white" />
        <Area.Group strokeWidth="2" stroke="black" strokeLinecap="square">
          <Area.Line x1="8%" x2="90%" y1="95%" y2="95%" />
          <Area.Line x1="8%" x2="8%" y1="10%" y2="95%" />
        </Area.Group>
        <Area.Group>
          {(() => {
            const x = [];
            const { num } = this.props;
            const w = columnWidth(num);
            return new Array(this.props.num).fill(0).map((_, i) => (
              <Area.Group key={i}>
                <Area.Rectangle
                  fill={this.props.colors[0]}
                  x={`${8 + w * 2 * i}%`}
                  y="94.8%"
                  width={`${w}%`}
                  height={`${this.state.heights[2 * i]}%`}
                />
                <Area.Rectangle
                  fill={this.props.colors[1]}
                  x={`${8 + w * (2 * i + 1)}%`}
                  y="94.8%"
                  width={`${w}%`}
                  height={`${this.state.heights[2 * i + 1]}%`}
                />
                {i < num - 2 && (
                  <Area.Line
                    stroke="grey"
                    x1={`${8 + w * (4 * i + 2)}%`}
                    x2={`${8 + w * (4 * i + 2)}%`}
                    y1="10%"
                    y2="95%"
                  />
                )}
              </Area.Group>
            ));
          })()}
        </Area.Group>
      </Area>
    );
  }
}

Diagram.propTypes = {
  colors: PropTypes.arrayOf(PropTypes.string),
  num: PropTypes.number,
  p: PropTypes.number,
};

Diagram.defaultProps = {
  colors: ['blue', 'red'],
  num: 2,
  p: 50,
};

const strToArray = str => str.split('-').map(v => v.trim());

class Main extends Component {
  state = {
    color1a: 'blue',
    color1b: 'grey',
    color2a: 'red',
    color2b: 'green',
    p: 50,
    childWindow: false,
  };

  render() {
    return (
      <App>
        <Menu>
          <Menu.Item type="Quit" />
        </Menu>
        <Window title="Notes" size={{ w: 800, h: 500 }} margined>
          <Box padded>
            <Form padded stretchy={false}>
              <Box label="Colors for the left chart" vertical={false} padded>
                <ColorButton
                  color={this.state.color1a}
                  onChange={({ r, g, b, a }) => {
                    this.setState({
                      color1a: `rgba(${r}, ${g}, ${b}, ${a})`,
                    });
                  }}
                />
                <ColorButton
                  color={this.state.color1b}
                  onChange={({ r, g, b, a }) => {
                    this.setState({
                      color1b: `rgba(${r}, ${g}, ${b}, ${a})`,
                    });
                  }}
                />
              </Box>
              <Box label="Colors for the left chart" vertical={false} padded>
                <ColorButton
                  color={this.state.color2a}
                  onChange={({ r, g, b, a }) => {
                    this.setState({
                      color2a: `rgba(${r}, ${g}, ${b}, ${a})`,
                    });
                  }}
                />
                <ColorButton
                  color={this.state.color2b}
                  onChange={({ r, g, b, a }) => {
                    this.setState({
                      color2b: `rgba(${r}, ${g}, ${b}, ${a})`,
                    });
                  }}
                />
              </Box>
              <Slider
                stretchy={false}
                label="Likelihood"
                onChange={p => this.setState({ p })}
                value={this.state.p}
              />
            </Form>
            <Text stretchy={false} label="">
              Some charts: (double click to randomize)
            </Text>
            <Box vertical={false} padded stretchy={false}>
              <Diagram
                colors={[this.state.color1a, this.state.color1b]}
                num={5}
                p={this.state.p}
              />
              <Diagram
                colors={[this.state.color2a, this.state.color2b]}
                num={3}
                p={this.state.p}
              />
            </Box>
            <Box vertical={false} padded stretchy={false}>
              <Button
                onClick={() =>
                  this.setState({
                    color1a: this.state.color1b,
                    color1b: this.state.color1a,
                    color2a: this.state.color2b,
                    color2b: this.state.color2a,
                  })
                }
              >
                Swap colors
              </Button>
              <Button
                onClick={() =>
                  this.setState({
                    color1a: this.state.color2a,
                    color1b: this.state.color2b,
                    color2a: this.state.color1a,
                    color2b: this.state.color1b,
                  })
                }
              >
                Swap the other way
              </Button>
              <Button
                onClick={() => this.setState({ childWindow: true })}
                enabled={!this.state.childWindow}
              >
                Open a child window
              </Button>
            </Box>
          </Box>
        </Window>
        {this.state.childWindow && (
          <Window
            title="Child"
            size={{ w: 300, h: 70 }}
            margined
            lastWindow={false}
            onClose={() => this.setState({ childWindow: false })}
          >
            <Box>
              <Text>Unfortunately, there is nothing to see here.</Text>
            </Box>
          </Window>
        )}
      </App>
    );
  }
}

render(<Main />);
