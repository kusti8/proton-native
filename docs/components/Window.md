# Window

Window is currently a component that is different than React Native. We create this as a separate component rather than
just creating a window for you in case you want to create multiple windows.

The following creates a window that takes up 50% of the desktop in height, and 20% of the width.

```jsx
import React, { Component } from 'react';

import { AppRegistry, Window, App } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window style={{ height: '50%', width: '20%' }} />
      </App>
    );
  }
}

AppRegistry.registerComponent('Test', <Example />);
```

## Props

- [style](#style)
- [onResize](#onResize)
- [onMove](#onMove)

## Reference

### style

Accepts all the same styles as View. Height and width can be specified as integers, where they are treated
as pixel counts, or percentages, where they are treated as percentages of the entire desktop size.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| object   | No           | {}          |

### onResize

Called when the window is resized. An object is passed into the function, with the following
object: `{w, h}`

| **Type**                         | **Required** | **Default** |
| -------------------------------- | ------------ | ----------- |
| function({h: number, w: number}) | No           | () => {})   |

### onMove

Called when the window is moved. An object is passed into the function, with the following
object: `{x, y}`

| **Type**                         | **Required** | **Default** |
| -------------------------------- | ------------ | ----------- |
| function({x: number, y: number}) | No           | () => {})   |
