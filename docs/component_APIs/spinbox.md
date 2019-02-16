# Spinbox

A location for the user to choose a number.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Spinbox } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Spinbox value={10} />
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

* [enabled](#enabled)
* [visible](#visible)
* [value](#value)
* [onChange](#onChange)

## Reference

### enabled

Whether the Spinbox is enabled.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### visible

Whether the Spinbox can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### value

What the value of the Spinbox is set to.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| number   | No           | 0           |

### onChange

When the Spinbox value is changed. The current value is passed as a parameter.

| **Type**        | **Required** |
| --------------- | ------------ |
| function(value) | No           |
