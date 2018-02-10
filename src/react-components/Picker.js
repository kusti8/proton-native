import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Combobox, ComboboxItem, EditableCombobox } from '../';

class Picker extends Component {
  render() {
    const { editable, children, ...otherProps } = this.props;
    if (editable) {
      return <EditableCombobox {...otherProps}>{children}</EditableCombobox>;
    } else {
      return <Combobox {...otherProps}>{children}</Combobox>;
    }
  }
}

Picker.Item = class Item extends Component {
  render() {
    const { children } = this.props;
    return <ComboboxItem>{children}</ComboboxItem>;
  }
};

Picker.propTypes = {
  editable: PropTypes.bool,
};

Picker.defaultProps = {
  editable: false,
};

export default Picker;
