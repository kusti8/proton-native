import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VerticalBox, HorizontalBox } from '../';

class Box extends Component {
  render() {
    const { vertical, children, ...otherProps } = this.props;

    if (vertical) {
      return React.createElement(VerticalBox, otherProps, children);
    }

    return React.createElement(HorizontalBox, otherProps, children);
  }
}

Box.propTypes = {
  vertical: PropTypes.bool,
};

Box.defaultProps = {
  vertical: true,
};

export default Box;
