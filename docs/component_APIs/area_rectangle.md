# Area.Rectangle

A rectangle to be displayed in an [Area](area.md) component.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area>
            <Area.Rectangle
              x="10"
              y="10"
              width="100"
              height="200"
              fill="blue"
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
* [width](#width)
* [height](#height)
* (All props listed in [Area Props](area_props.md))

## Reference

### x

The x coordinate of the rectangles top left corner.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### y

The y coordinate of the rectangles top left corner.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### width

The width of the rectangle.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### height

The height of the rectangle.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |
