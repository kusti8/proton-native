# Window

The window is the basis where all other components reside.

The following example creates a simple window, of size 500x500.

```jsx
import React, { Component } from 'react';

import { render, Window, App } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{w: 500, h: 500}} />
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [title](#title)
- [size](#size)
- [menuBar](#menuBar)
- [margined](#margined)
- [position](#position)
- [fullscreen](#fullscreen)
- [borderless](#borderless)
- [lastWindow](#lastWindow)
- [closed](#closed)
- [onClose](#onClose)
- [onPositionChange](#onPositionChange)
- [onContentSizeChange](#onContentSizeChange)

## Reference

### title

The title of the window. Will be shown at the top left ribbon.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| string | No | '' |

### size

How big the window is when the application is first started.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| object {h: number, w: number} | No | {h: 500, w: 500} |

### menuBar

Whether a menubar will be shown on the top of the window.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### margined

Whether all children will have a margin around them and the outer edge of the window.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### position

The location where the window will be started, where (0,0) is top left.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| object {x: number, y: number} | No | {x: 300, y: 300} |

### fullscreen

Whether the window will be fullscreen on start.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### borderless

Whether the window will have a border on the inside.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### lastWindow

Whether the window is the last window. If set to `true`, then the program will quit once the window is closed.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### closed

Whether the window is closed. If set to closed, then the window will be closed.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### onClose

Called when the window is closed.

| **Type** | **Required** |
| --- | --- |
| function() | No |

### onPositionChange

Called when the window position is changed. The new position is passed as an argument, in an object.

| **Type** | **Required** |
| --- | --- |
| function({x: number, y: number}) | No |

### onContentSizeChange

Called when the window size is changed by the user. The new size is passed as an argument, in an object.

| **Type** | **Required** |
| --- | --- |
| function({h: number, y: number}) | No |