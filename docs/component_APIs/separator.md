# Separator

A line to separate two components, commonly used in a Box.

```jsx
import React, { Component } from 'react';

import {
  render,
  Window,
  App,
  Box,
  Button,
  TextInput,
  Separator,
} from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Box>
            <Button>Hello</Button>
            <Separator />
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

* [vertical](#vertical)
* [enabled](#enabled)
* [visible](#visible)

## Reference

### vertical

Whether the line is vertical or horizontal.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### enabled

Whether the Separator is enabled.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### visible

Whether the Separator can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |
