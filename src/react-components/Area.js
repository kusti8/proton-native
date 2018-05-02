import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AreaInternal } from '../';

const AreaComponentPropTypes = {
  transform: PropTypes.string,
  fill: PropTypes.string,
  fillOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  stroke: PropTypes.string,
  strokeOpacity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  strokeLinecap: PropTypes.oneOf(['flat', 'round', 'square']),
  strokeLinejoin: PropTypes.oneOf(['miter', 'round', 'bevel']),
  strokeMiterlimit: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

const AreaComponentDefaultProps = {
  fillOpacity: 1,
  strokeOpacity: 1,
  strokeWidth: 1,
  strokeMiterlimit: 10,
  strokeLinecap: 'flat',
  strokeLinejoin: 'miter',
};

class Area extends Component {
  render() {
    const {
      children,
      stretchy,
      label,
      column,
      row,
      span,
      expand,
      align,
      onMouseMove,
      onMouseUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onKeyUp,
      onKeyDown,
      ...groupProps
    } = this.props;
    const areaProps = {
      children,
      stretchy,
      label,
      column,
      row,
      span,
      expand,
      align,
      onMouseMove,
      onMouseUp,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onKeyUp,
      onKeyDown,
    };
    return React.createElement(
      AreaInternal,
      areaProps,
      React.createElement(Area.Group, groupProps, children)
    );
  }
}

Area.propTypes = {
  ...AreaComponentPropTypes,
};

Area.defaultProps = {
  ...AreaComponentDefaultProps,
};

export default Area;
