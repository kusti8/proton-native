# Checkbox

A toggleable box with some text on it.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Checkbox } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Checkbox>This is a checkbox</Checkbox>
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
- [checked](#checked)
- [onToggle](#onToggle)

## Reference

### children

The text to display next to the check box.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| string   | No           | ''          |

### enabled

Whether the checkbox can be used.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### visible

Whether the checkbox can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           |

### checked

Whether the checkbox is checked or not.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | false       |

### onToggle

Called when the checkbox is clicked. The current checkbox state is passed as an argument.

| **Type**          | **Required** |
| ----------------- | ------------ |
| function(checked) | No           |
