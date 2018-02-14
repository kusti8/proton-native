# Grid

A container where there are rows and columns to align the components.

Every component has many props, which are described [here](grid_components.md) in detail.

```javascript
import React, { Component } from 'react';

import { render, Window, App, Grid, Button, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
          <Grid padded={true}>
            <Button row={0} column={0}>
              Hello
            </Button>
            <TextInput row={0} column={1}>
              Hi
            </TextInput>
          </Grid>
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
- [padded](#padded)

## Reference

### enabled

Whether the Grid is enabled.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Grid can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### padded

Whether there is padding between the components

| **Type** | **Required** |
| --- | --- |
| bool | No |