# Button

A clickable object which registers a callback when clicked.

The following example creates a simple button, with the text "This is a button".

```jsx
import React, { Component } from 'react';

import { render, Window, App, Button } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Button>This is a button</Button>
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
- [onClick](#onClick)

## Reference

### children

The text to display in the button.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| string   | No           | ''          |

### enabled

Whether the button can be clicked.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### visible

Whether the button can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### onClick

Called when the button is clicked.

| **Type**   | **Required** |
| ---------- | ------------ |
| function() | No           |
