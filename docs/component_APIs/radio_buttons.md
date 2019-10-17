# RadioButtons

A choice between multiple options.

Every child must be a RadioButtons.Item, that requires a string child that is the label to display to the right of the RadioButton.

```jsx
import React, { Component } from 'react';

import { render, Window, App, RadioButtons } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <RadioButtons>
            <RadioButtons.Item>Option 1</RadioButtons.Item>
            <RadioButtons.Item>Option 2</RadioButtons.Item>
          </RadioButtons>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [enabled](#enabled)
- [visible](#visible)
- [selected](#selected)
- [onSelect](#onSelect)

## Reference

### enabled

Whether the RadioButtons can be used.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### visible

Whether the RadioButtons can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### selected

What RadioButton is selected, zero-indexed. -1 means nothing is selected.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| number   | No           | -1          |

### onSelect

Called when a RadioButton is selected. The number selected is passed as an argument.

| **Type**           | **Required** |
| ------------------ | ------------ |
| function(selected) | No           |
