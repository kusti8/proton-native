# Area.Gradient

A class describing a gradient to be used as a fill or stroke brush in an [Area](component_APIs/area) component.

```jsx
import React, { Component } from 'react';
import { render, App, Window, Box, Area } from 'proton-native';

const linearGradient = Area.Gradient.createLinear(30, 30, 100, 100, {
  0: 'red',
  1: 'blue',
});

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Box>
            <Area>
              <Area.Rectangle
                x="20"
                y="20"
                width="110"
                height="110"
                stroke={linearGradient}
                strokeWidth="20"
                strokeOpacity="50"
              />
            </Area>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Static methods

- [createLinear(x1, y1, x2, y2, stops)](#createlinearx1-y1-x2-y2-stops)
- [createRadial(x, y, r, stops)](#createradialx-y-r-stops)
- [createRadial(x, y, x_r, y_r, r, stops)](#createradialx-y-x_r-y_r-r-stops)

## Reference

### createLinear(x1, y1, x2, y2, stops)

Returns a gradient brush for a linear gradient between the start point (`x1`, `y1) and end point (`x2`,`y2) with the specified color stops.

`stops` is a object with keys specifying the position between the start (`= 0.0`) and end points (`= 1.0`). Example:

```js
{
    0: "red",
    0.25: "#ff00ff",
    1: "green"
}
```

| **Parameter** | **Type**                    | **Required** |
| ------------- | --------------------------- | ------------ |
| x1            | Number                      | Yes          |
| y1            | Number                      | Yes          |
| x2            | Number                      | Yes          |
| y2            | Number                      | Yes          |
| stops         | Object&lt;Number, Color&gt; | Yes          |

### createRadial(x, y, r, stops)

Returns a gradient brush for a radial gradient between the center point (`x`,`y`) and the circle with radius `r`.

`stops` is a object with keys specifying the position between the center point (with `0.0`) and the circle itself (`1.0`). Example:

```js
{
    0: "red",
    0.25: "#ff00ff",
    1: "green"
}
```

| **Parameter** | **Type**                    | **Required** |
| ------------- | --------------------------- | ------------ |
| x1            | Number                      | Yes          |
| y1            | Number                      | Yes          |
| r             | Number                      | Yes          |
| stops         | Object&lt;Number, Color&gt; | Yes          |

### createRadial(x, y, x_r, y_r, r, stops)

Returns a gradient brush for a radial gradient between the point (`x`,`y`) and a circle with radius `r` and center (`x_r`,`y_r`). (This can produce asymetric gradients.)

`stops` is a object with keys specifying the position between the first point (with `0.0`) and the outer circle (`1.0`). Example:

```js
{
    0: "red",
    0.25: "#ff00ff",
    1: "green"
}
```

| **Parameter** | **Type**                    | **Required** |
| ------------- | --------------------------- | ------------ |
| x1            | Number                      | Yes          |
| y1            | Number                      | Yes          |
| x_r           | Number                      | Yes          |
| y_r           | Number                      | Yes          |
| r             | Number                      | Yes          |
| stops         | Object&lt;Number, Color&gt; | Yes          |
