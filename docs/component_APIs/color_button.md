# ColorButton

A button that allows the user to choose a color.

```jsx
import React, { Component } from 'react';

import { render, Window, App, ColorButton } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <ColorButton />
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [color](#color)
- [onChange](#onChange)

## Reference

### color

The initial color for the ColorButton. Can be passed as standard color seen in CSS (a color name, hex, rgb, rgba, hsl, hsla).

- RGBA: `rgba(255, 0, 0, 0.7)`
- HSLA: `hsla(0, 100, 50, 0.7)`
- Hex: `#FF0000`
- Name: `red`

A full list of names can be found [here](https://www.w3schools.com/colors/colors_names.asp)

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| string   | No           | 'black'     |

### onChange

Called when the color is changed for the ColorButton. The current color is passed as an object of RGBA.

| **Type**                                               | **Required** |
| ------------------------------------------------------ | ------------ |
| function({r: number, g: number, b: number, a: number}) | No           |
