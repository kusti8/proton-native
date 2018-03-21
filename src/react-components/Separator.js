import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VerticalSeparator, HorizontalSeparator } from '../';

class Separator extends Component {
  render() {
    const { vertical, children, ...otherProps } = this.props;
    if (vertical) {
      return React.createElement(VerticalSeparator, otherProps);
    }

    return React.createElement(HorizontalSeparator, otherProps);
  }
}

Separator.propTypes = {
  vertical: PropTypes.bool,
};

Separator.defaultProps = {
  vertical: true,
};

export default Separator;
