# Grid Children

A child in a [Grid component](grid.md). Can specify the location in the grid, as well as additional formatting.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Grid, Button, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
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

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| number   | No           | 0           |

### row

What row the component resides in.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| number   | No           | 0           |

### span

How many rows/columns the component takes off.

| **Type**                      | **Required** | **Default**  |
| ----------------------------- | ------------ | ------------ |
| object {x: number, y: number} | No           | {x: 1, y: 1} |

### expand

Whether the component can expand in the direction.

Note: Grid expand does not work correctly when both align horizontal and align vertical are set. You must choose one so Proton Native knows which direction to expand.

| **Type**                  | **Required** | **Default**        |
| ------------------------- | ------------ | ------------------ |
| object {h: bool, v: bool} | No           | {h: true, v: true} |

### align

Whether the component is aligned with the other components in the column/row.

| **Type**                  | **Required** | **Default**        |
| ------------------------- | ------------ | ------------------ |
| object {h: bool, v: bool} | No           | {h: true, v: true} |
