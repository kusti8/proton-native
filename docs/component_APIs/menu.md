# Menu

The top bar on a window that can have multiple options.

The menu must come outside and before the Window for it to take effect. It is made up of Menu.Items.

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
        <Window title="Example" size={{ w: 500, h: 500 }} />
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [label](#label)

## Reference

### label

The name of the menu.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| string   | No           | ''          |
