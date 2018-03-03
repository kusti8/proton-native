# Grid

A grid where components can be placed in rows and columns. 

```jsx
import React, { Component } from 'react';

import { render, Window, App, Grid, Button, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{w: 500, h: 500}}>
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

Whether the Form is enabled.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### visible

Whether the Form can be seen.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### padded

Whether there is padding between the components

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |