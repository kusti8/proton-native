# AreaGroup

A component to apply props to all it's children in an [Area](area.md) component.

To be able to use percentage values in transforms, the props `width` and `height` need to be specified (they have no graphical effect).

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area, AreaGroup, Rectangle } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area>
            <AreaGroup
              stroke="black"
              strokeWidth="10"
              transform="translate(100, 50)"
            >
              <Rectangle x="0" y="0" width="100" height="100" fill="red" />
              <Rectangle x="100" y="0" width="100" height="100" fill="blue" />
            </AreaGroup>
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
