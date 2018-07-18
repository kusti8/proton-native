# Area.Gradient

A gradient to be used with the `fill` or `stroke` prop. A linear gradient lies between two points, whereas a radial gradient goes from a center point to a larger outer circle.

```jsx
import React, { Component } from 'react';
import { render, Window, App, Box, Area } from '../src/';

const linearG = (
  <Area.Gradient type="linear" x1="20" y1="20" x2="90" y2="90">
    <Area.GradientStop color="red" offset="0" />
    <Area.GradientStop color="blue" offset="100%" />
  </Area.Gradient>
);

const radialG = (
  <Area.Gradient type="radial" x1="250" y1="250" r="100">
    <Area.GradientStop color="red" offset="0" />
    <Area.GradientStop color="blue" offset="100%" />
  </Area.Gradient>
);

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 500, h: 500 }} margined={true}>
          <Box padded>
            <Area>
              <Area.Rectangle
                x="10"
                y="10"
                width="100"
                height="100"
                fill={linearG}
                fillOpacity={this.state.v4 / 100}
              />
              <Area.Rectangle
                x="200"
                y="200"
                width="100"
                height="100"
                fill={radialG}
                stroke="blue"
                strokeWidth="30"
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

### Props

#### type

The gradient type.

| **Type**                 | **Required** |
| ------------------------ | ------------ |
| enum('linear', 'radial') | true         |

#### x1

The x coordinate of the gradient's start point.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |

#### y1

The y coordinate of the gradient's start point.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |

#### x2

The x coordinate of the gradient's end point.

| **Type**                      | **Required**          |
| ----------------------------- | --------------------- |
| number &#x7c; string (number) | Only if type="linear" |

#### y2

The y coordinate of the gradient's end point.

| **Type**                      | **Required**          |
| ----------------------------- | --------------------- |
| number &#x7c; string (number) | Only if type="linear" |

## Area.GradientStop

Specifying a color in a gradient.

### Props

#### color

| **Type**       | **Required** |
| -------------- | ------------ |
| string (Color) | true         |

#### offset

Where between the start and end point this stop lies, specified by a value between 0 and 1 or 0% and 100%.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| number &#x7c; string (number) | true         |
