# ProgressBar

A bar that shows the progress in a certain task, 0-100.

```jsx
import React, { Component } from 'react';

import { render, Window, App, ProgressBar } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{w: 500, h: 500}}>
            <ProgressBar value={-1} />
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
- [value](#value)

## Reference

### enabled

Whether the ProgressBar is enabled.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### visible

Whether the ProgressBar can be seen.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### value

The current value of the ProgressBar (0-100). A value of -1 indicates an indeterminate progressbar.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| number | No | 0 |
