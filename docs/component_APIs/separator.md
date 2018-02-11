# Separator

A line to separate two components, commonly used in a Box.

```javascript
import React, { Component } from 'react';

import { render, Window, App, Box, Button, TextInput, Separator } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
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

- [vertical](#vertical)
- [enabled](#enabled)
- [visible](#visible)

## Reference

### vertical

Whether the line is vertical or horizontal.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### enabled

Whether the Separator is enabled.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Separator can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |