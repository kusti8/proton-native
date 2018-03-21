import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonItem } from '../';

class RadioButtons extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return React.createElement(RadioButton, otherProps, children);
  }
}

RadioButtons.Item = class Item extends Component {
  render() {
    const { children } = this.props;
    return React.createElement(RadioButtonItem, null, children);
  }
};

export default RadioButtons;
