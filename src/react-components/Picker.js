import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Combobox, ComboboxItem, EditableCombobox } from '../';

class Picker extends Component {
  render() {
    const { editable, children, ...otherProps } = this.props;
    if (editable) {
      return React.createElement(EditableCombobox, otherProps, children);
    }

    return React.createElement(Combobox, otherProps, children);
  }
}

Picker.Item = class Item extends Component {
  render() {
    const { children } = this.props;
    return React.createElement(ComboboxItem, null, children);
  }
};

Picker.propTypes = {
  editable: PropTypes.bool,
};

Picker.defaultProps = {
  editable: false,
};

export default Picker;
