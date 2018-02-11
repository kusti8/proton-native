# Picker

A drop down menu where the user can pick different values.

```javascript
import React, { Component } from 'react';

import { render, Window, App, Menu } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window name="Example" height={500} width={500}>
          <Picker>
           <Picker.Item>Option 1</Picker.Item>
           <Picker.Item>Option 2</Picker.Item>
           <Picker.Item>Option 3</Picker.Item>
          </Picker>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [editable](#editable)
- [enabled](#enabled)
- [visible](#visible)
- [selected](#selected)
- [text](#text)

## Reference

### editable

Whether the user can enter their own custom text in addition to the drop down menu.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### enabled

Whether the Picker is enabled.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Picker can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### selected

What element is selected if the picker *is not* editable.

| **Type** | **Required** | **Editable** |
| --- | --- | --- |
| bool | No | No |

### text

What text is selected/typed if the picker *is* editable.

| **Type** | **Required** | **Editable** |
| --- | --- | --- |
| bool | No | Yes |

### onSelected

When a *non-editable* Picker is changed. The current selection is passed as an argument.

| **Type** | **Required** | **Editable** |
| --- | --- | --- |
| function(selection) | No | No |

### onChanged

When an *editable* Picker is changed. The current text is passed as an argument.

| **Type** | **Required** | **Editable** |
| --- | --- | --- |
| function(text) | No | Yes |