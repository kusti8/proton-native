# Grid Children

A child in a [Grid component](grid.md). Can specify the location in the grid, as well as additional formatting.

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

- [column](#column)
- [row](#row)
- [span](#span)
- [expand](#expand)
- [align](#align)

## Reference

### column

What column the component resides in.

| **Type** | **Required** |
| --- | --- |
| number | No |

### row

What row the component resides in.

| **Type** | **Required** |
| --- | --- |
| number | No |

### span

How many rows/columns the component takes off.

| **Type** | **Required** |
| --- | --- |
| object {x: number, y: number} | No |

### expand

Whether the component can expand in the direction.

| **Type** | **Required** |
| --- | --- |
| object {h: bool, v: bool} | No |

### align

Whether the component is aligned with the other components in the column/row.

| **Type** | **Required** |
| --- | --- |
| object {h: bool, v: bool} | No |