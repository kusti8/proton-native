import React, { Component } from 'react';
import { Entry, PasswordEntry, MultilineEntry } from '../';

class TextInput extends Component {
  render() {
    const { secure, multiline, children, ...otherProps } = this.props;
    if (secure === true) {
      return <PasswordEntry {...otherProps}>{children}</PasswordEntry>;
    } else {
        if (multiline === true) {
            return <MultilineEntry {...otherProps}>{children}</MultilineEntry>;
        } else {
            return <Entry {...otherProps}>{children}</Entry>;
        }
    }
  }
}

export default TextInput;
