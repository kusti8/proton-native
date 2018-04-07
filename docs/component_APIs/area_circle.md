# Circle

A circle to be displayed in an [Area](area.md) component.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area, Circle } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area>
            <Circle x="50" y="50" r="10" fill="blue" />
          </Area>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

* [x](#x)
* [y](#y)
* [r](#r)
* (All props listed in [Area Props](area_props.md))

## Reference

### x

The x coordinate of the center of the cirle.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### y

The y coordinate of the center of the cirle.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### r

The circle's radius. Percentage values use the Area's width.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |
