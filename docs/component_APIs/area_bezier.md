# Bezier

A Bezier curve to be displayed in an [Area](area.md) component.

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

* [x1](#x1)
* [y1](#y1)
* [cx1](#cx1)
* [cy1](#cy1)
* [x2](#x2)
* [y2](#y2)
* [cx2](#cx2)
* [cy2](#cy2)
* (All props listed in [Area Props](area_props.md))

## Reference

### x1

The x coordinate of the curve's start point.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### y1

The y coordinate of the curve's start point.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### cx1

The x coordinate of the curve's control point at the start.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### cy1

The y coordinate of the curve's control point at the start.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### x2

The x coordinate of the curve's end point.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### y2

The y coordinate of the curve's end point.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### cx2

The x coordinate of the curve's control point at the end.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |

### cy2

The y coordinate of the curve's control point at the end.

| **Type**                  | **Required** |
| ------------------------- | ------------ |
| number \| string (number) | true         |
