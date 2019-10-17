import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PickerInternal } from '../';

class Picker extends Component {
  render() {
    const { children, ...props } = this.props;
    return <PickerInternal {...props}>{children}</PickerInternal>;
  }
}

class PickerItem extends Component {
  static defaultProps = {};
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
  };
  render() {
    return null;
  }
}

Picker.Item = PickerItem;
export default Picker;
