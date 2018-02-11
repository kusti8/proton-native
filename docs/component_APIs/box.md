# Button

A container for multiple components that are ordered vertically or horizontally. Similar to React Native's `View`.

The following example holds both a Button and a TextInput that are arranged vertically

```javascript
import React, { Component } from 'react';

import { render, Window, App, Box, Button, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
          <Box>
            <Button>Hello</Button>
            <TextInput />
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [vertical](#vertical)
- [enabled](#enabled)
- [visible](#visible)
- [padded](#padded)

## Reference

### vertical

Whether the Box arranges its children vertically or horizontally.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### enabled

Whether the Box is enabled.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Box and its children can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### padded

Whether there is extra space between the children in the Box.

| **Type** | **Required** |
| --- | --- |
| bool | No |