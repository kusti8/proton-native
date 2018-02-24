# Dialog

A method to display an alert, or a dialog to save or open a file.

```javascript
import React, { Component } from 'react';

import { render, Window, App, TextInput, Dialog } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{w: 500, h: 500}}>
            <TextInput onChange={() => Dialog('Error', {title: "Message"})}/>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Arguments

- [type](#type)
- [options](#options)

## Reference

### type

What type the dialog is. The current types are:

- Message - a simple message
- Error - an error message
- Open - open a file
- Save - save a file

| **Type** | **Required** |
| --- | --- |
| enum('Message', 'Error', 'Open', 'Save') | Yes |

### options

Options for the title and description if it is a Message or Error.

| **Type** | **Required** |
| --- | --- |
| {title: string, description: string} | One (if it is Message or Error) |
