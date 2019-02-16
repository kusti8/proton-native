# Picker

A drop down menu where the user can pick different values.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Picker } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
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

* [editable](#editable)
* [enabled](#enabled)
* [visible](#visible)
* [selected](#selected)
* [text](#text)

## Reference

### editable

Whether the user can enter their own custom text in addition to the drop down menu.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | false       |

### enabled

Whether the Picker is enabled.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### visible

Whether the Picker can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### selected

The index of the element that is selected if the picker _is not_ editable.

| **Type** | **Required** | **Editable** | **Default** |
| -------- | ------------ | ------------ | ----------- |
| number   | No           | No           | -1          |

### text

What text is selected/typed if the picker _is_ editable.

| **Type** | **Required** | **Editable** | **Default** |
| -------- | ------------ | ------------ | ----------- |
| string   | No           | Yes          | ''          |

### onSelect

When a _non-editable_ Picker is changed. The current selection index is passed as an argument.

| **Type**                 | **Required** | **Editable** |
| ------------------------ | ------------ | ------------ |
| function(selectionIndex) | No           | No           |

### onChange

When an _editable_ Picker is changed. The current text is passed as an argument.

| **Type**       | **Required** | **Editable** |
| -------------- | ------------ | ------------ |
| function(text) | No           | Yes          |
