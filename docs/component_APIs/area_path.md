# Area.Path

A component describing a path to be displayed in an [Area](component_APIs/area.md) component.

To be able to use percentage values in transforms, the props `width` and `height` need to be specified (they have no graphical effect).

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area>
            <Area.Path
              d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
              stroke="red"
            />
            <Area.Path
              d="M10 10 H 90 V 90 H 10 Z"
              transform="translate(250, 20)"
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

* [d](#d)
* [fillMode](#fillmode)
* (All props listed in [Area Props](component_APIs/area_props.md))

## Reference

### d

A string describing the path (uses SVG's path syntax, explanation [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths)).

A warning is displayed whan an unimplemented shaped are used (Quadratic Beziers and Arcs).

| **Type** | **Required** |
| -------- | ------------ |
| string   | true         |

### fillMode

Sets the methods how to determine wheter to fill a path. Explanation [here](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill-rule).

| **Type**                   | **Required** |
| -------------------------- | ------------ |
| enum('nonzero', 'evenodd') | true         |
