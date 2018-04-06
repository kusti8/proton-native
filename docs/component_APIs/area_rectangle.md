# Rectangle

A rectangle to be displayed in an [Area](area.md).

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area, Rectangle } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area>
            <Rectangle x="10" y="10" width="100" height="200" fill="blue" />
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

## Reference

### x

The x coordinate of the rectangles top left corner.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | false        |

### y

The y coordinate of the rectangles top left corner.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | false        |

### width

The width of the rectangle.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | false        |

### height

The height of the rectangle.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | false        |
