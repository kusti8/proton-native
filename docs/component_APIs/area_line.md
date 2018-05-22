# Area.Line

A straigt line to be displayed in an [Area](area.md) component.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area>
            <Area.Line x1="50" y1="50" x2="100" y2="200" stroke="blue" />
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
* [x2](#x2)
* [y2](#y2)
* (All props listed in [Area Props](area_props.md))

## Reference

### x1

The x coordinate of the line's start point.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |

### y1

The y coordinate of the line's start point.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |

### x2

The x coordinate of the line's end point.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |

### y2

The y coordinate of the line's end point.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |
