# App

The app is the container for the entire program and holds Windows and Menus.

```jsx
import React, { Component } from 'react';

import { render, Window, App } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }} />
      </App>
    );
  }
}

render(<Example />);
```

## Props

* [onShouldQuit](#onShouldQuit)

## Reference

### onShouldQuit

Called when the quit menu item is called, right before the entire app quits.

| **Type**   | **Required** | **Default** |
| ---------- | ------------ | ----------- |
| function() | No           | () => {}    |
