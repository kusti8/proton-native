import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Wind } from '../';

class Window extends Component {
  render() {
    let { onContentSizeChange, ...otherProps } = this.props;
    const newOnContentSizeChange = size => {
      this.forceUpdate(() => onContentSizeChange(size));
    };
    otherProps = { onContentSizeChange: newOnContentSizeChange, ...otherProps };
    return React.createElement(Wind, otherProps, otherProps.children);
  }
}

Window.propTypes = {
  onContentSizeChange: PropTypes.func,
};

Window.defaultProps = {
  onContentSizeChange: () => {},
};

export default Window;
