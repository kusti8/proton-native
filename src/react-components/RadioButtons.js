import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonItem } from '../';

class RadioButtons extends Component {
  render() {
    const { children, ...otherProps } = this.props;
    return <RadioButton {...otherProps}>{children}</RadioButton>;
  }
}

RadioButtons.Item = class Item extends Component {
  render() {
    const { children } = this.props;
    return <RadioButtonItem>{children}</RadioButtonItem>;
  }
};

export default RadioButtons;
