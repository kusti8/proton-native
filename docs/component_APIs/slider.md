# Slider

A bar that can be dragged by the user from 0-100.

```javascript
import React, { Component } from 'react';

import { render, Window, App, Slider } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{w: 500, h: 500}}>
            <Slider value={0} />
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
- [onChanged](#onChanged)

## Reference

### enabled

Whether the Slider is enabled.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Slider can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### value

The current value of the Slider (0-100).

| **Type** | **Required** |
| --- | --- |
| number | No |

### onChanged

Called when the value of the slider is changed. The current value is passed as an argument.

| **Type** | **Required** |
| --- | --- |
| function(value) | No |