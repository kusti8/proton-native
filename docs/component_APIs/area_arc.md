# Area.Arc

A circular arc to be displayed in an [Area](area.md) component.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area>
            <Area.Arc
              x="50%"
              y="50%"
              r="100"
              start="90"
              sweep="120"
              stroke="blue"
            />
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
* [start](#start)
* [sweep](#sweep)
* (All props listed in [Area Props](area_props.md))

## Reference

### x

The x coordinate of the center of the arc.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |

### y

The y coordinate of the center of the arc.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |

### r

The arc's radius. Percentage values use the Area's width.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |

### start

The start angle of the arc in degrees. Value increases clockwise with `0` meaning the rightmost point ("east") of the imaginary circle.

| **Type**                      | **Required** | **Default** |
| ----------------------------- | ------------ | ----------- |
| number &#x7c; string (number) | false        | 0           |

### sweep

The sweep angle of the arc in degrees. Value increases clockwise.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |
