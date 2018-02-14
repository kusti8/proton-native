# Progress Bar

A bar that shows the progress in a certain task, 0-100.

```javascript
import React, { Component } from 'react';

import { render, Window, App, ProgressBar } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
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

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the ProgressBar can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### value

The current value of the ProgressBar (0-100). A value of -1 indicates an indeterminate progressbar.

| **Type** | **Required** |
| --- | --- |
| number | No |