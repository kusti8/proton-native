# Area.Group

A component to apply props to all it's children in an [Area](area.md) component.

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
            <Area.Group
              stroke="black"
              strokeWidth="10"
              transform="translate(100, 50)"
            >
              <Area.Rectangle x="0" y="0" width="100" height="100" fill="red" />
              <Area.Rectangle
                x="100"
                y="0"
                width="100"
                height="100"
                fill="blue"
              />
            </Area.Group>
          </Area>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

* All props listed in [Area Props](area_props.md)
