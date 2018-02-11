# TextInput

A place for the user to type in a string.

```javascript
import React, { Component } from 'react';

import { render, Window, App, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
          <TextInput />
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [children](#children)
- [enabled](#enabled)
- [visible](#visible)
- [readOnly](#readOnly)
- [secure](#secure)
- [multiline](#multiline)
- [onChanged](#onChanged)

## Reference

### children

The default text in the TextInput.

| **Type** | **Required** |
| --- | --- |
| string | No |

### enabled

Whether the TextInput can be used.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the TextInput can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### readOnly

Whether the TextInput can be written to by the user.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### secure

Whether characters are hidden in the TextInput. Commonly used for passwords.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### multiline

Whether multiple lines can be inputted into the TextInput.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### onChanged

Called when the TextInput text is changed. The new text is passed as an argument.

| **Type** | **Required** |
| --- | --- |
| function(text) | No |