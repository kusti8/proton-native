import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Arc } from '../';

class Circle extends Component {
  render() {
    return React.createElement(Arc, { ...this.props, start: 0, sweep: '360' });
  }
}

Circle.propTypes = {
  x: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  y: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  r: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Circle;
