# Menu

The top bar on a window that can have multiple options.

The menu must come outside and before the Window for it to take effect. It is made up of Menu.Items. Menus can be embedded inside eachother to make sub-menus.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Menu } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
         <Menu label="HI">
           <Menu.Item>Hi</Menu.Item>
         </Menu>
        <Window title="Example" size={{w: 500, h: 500}} />
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [vertical](#vertical)
- [enabled](#enabled)
- [visible](#visible)

## Reference

### vertical

Whether the line is vertical or horizontal.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### enabled

Whether the Separator is enabled.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### visible

Whether the Separator can be seen.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |