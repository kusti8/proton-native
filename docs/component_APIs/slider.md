# Slider

A bar that can be dragged by the user to represent a value.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Slider } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Slider value={0} />
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

* [min](#min)
* [max](#max)
* [enabled](#enabled)
* [visible](#visible)
* [value](#value)
* [onChange](#onChange)

## Reference

### min

The minimum value for the slider.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| number   | No           | 0           |

### max

The maximum value for the slider.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| number   | No           | 100         |

### enabled

Whether the Slider is enabled.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### visible

Whether the Slider can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### value

The current value of the Slider.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| number   | No           | 0           |

### onChange

Called when the value of the slider is changed. The current value is passed as an argument.

| **Type**        | **Required** |
| --------------- | ------------ |
| function(value) | No           |
