import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VerticalBox, HorizontalBox } from '../';

class Box extends Component {
  render() {
    const { vertical, children, ...otherProps } = this.props;

    if (vertical) {
      return <VerticalBox {...otherProps}>{children}</VerticalBox>;
    }

    return <HorizontalBox {...otherProps}>{children}</HorizontalBox>;
  }
}

Box.propTypes = {
  vertical: PropTypes.bool,
};

Box.defaultProps = {
  vertical: true,
};

export default Box;
