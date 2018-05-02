# Area

A component onto which area components like rectangles or circles can be drawn.

Some props can be applied to all area components (**including Area itself** and children): see [Area Props](area_props.md).

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area, Rectangle } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area stroke="red" strokeWidth="10">
            <Rectangle x="10" y="10" width="100" height="200" fill="blue" />
          </Area>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

* [visible](#visible)
* [onMouseMove](#onMouseMove)
* [onMouseUp](#onMouseUp)
* [onMouseDown](#onMouseDown)
* [onMouseEnter](#onMouseEnter)
* [onMouseLeave](#onMouseLeave)
* [onKeyUp](#onKeyUp)
* [onKeyDown](#onKeyDown)

## Reference

### visible

Whether the area can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### onMouseMove

Called when the mouse is moved over the area

| **Type**                                                                                  | **Required** |
| ----------------------------------------------------------------------------------------- | ------------ |
| function({x: number, y: number, width: number, height: number, buttons: Array\<number\>}) | No           |

### onMouseUp

**Not working at the moment**

Called when releasing a mouse button over the area.

| **Type**                                                                        | **Required** |
| ------------------------------------------------------------------------------- | ------------ |
| function({x: number, y: number, width: number, height: number, button: number}) | No           |

### onMouseDown

Called when pressing a mouse button over the area.

| **Type**                                                                        | **Required** |
| ------------------------------------------------------------------------------- | ------------ |
| function({x: number, y: number, width: number, height: number, button: number}) | No           |

### onMouseEnter

Called when the mouse enters the area.

| **Type**   | **Required** |
| ---------- | ------------ |
| function() | No           |

### onMouseLeave

Called when the mouse leaves the area.

| **Type**   | **Required** |
| ---------- | ------------ |
| function() | No           |

### onKeyUp

Called when pressing a key.
Return `true` to signal that this event got handled (always returning true will disable any menu accelerators).

| **Type**                                                                        | **Required** |
| ------------------------------------------------------------------------------- | ------------ |
| function({key: string, extKey: number, modifierKey: number, modifiers: number}) | No           |

### onKeyDown

Called when releasing a key.
Return `true` to signal that this event got handled (always returning true will disable any menu accelerators).

| **Type**                                                                        | **Required** |
| ------------------------------------------------------------------------------- | ------------ |
| function({key: string, extKey: number, modifierKey: number, modifiers: number}) | No           |
