# TextInput

A place for the user to type in a string.

```jsx
import React, { Component } from 'react';

import { render, Window, App, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{w: 500, h: 500}}>
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
- [onChange](#onChange)

## Reference

### children

The default text in the TextInput.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| string | No | '' |

### enabled

Whether the TextInput can be used.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### visible

Whether the TextInput can be seen.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### readOnly

Whether the TextInput can be written to by the user.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### secure

Whether characters are hidden in the TextInput. Commonly used for passwords.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### multiline

Whether multiple lines can be inputted into the TextInput.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### onChange

Called when the TextInput text is changed. The new text is passed as an argument.

| **Type** | **Required** |
| --- | --- |
| function(text) | No |