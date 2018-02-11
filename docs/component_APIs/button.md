# Button

A clickable object which registers a callback when clicked.

The following example creates a simple button, with the text "This is a button".

```javascript
import React, { Component } from 'react';

import { render, Window, App, Button } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window name="Example" height={500} width={500}>
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
- [onClicked](#onClicked)

## Reference

### children

The text to display in the button.

| **Type** | **Required** |
| --- | --- |
| string | No |

### enabled

Whether the button can be clicked.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the button can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### onClicked

Called when the button is clicked.

| **Type** | **Required** |
| --- | --- |
| function() | No |