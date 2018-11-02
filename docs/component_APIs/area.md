# Area

A component onto which area components like rectangles or circles can be drawn.

Some props can be applied to all area components (**including Area itself** and children): see [Area Props](component_APIs/area_props.md).

```jsx
import React, { Component } from 'react';

import { render, Window, App, Area } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Area stroke="red" strokeWidth="10">
            <Area.Rectangle
              x="10"
              y="10"
              width="100"
              height="200"
              fill="blue"
            />
          </Area>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [visible](#visible)
- [scrolling](#scrolling)
- [onMouseMove](#onMouseMove)
- [onMouseUp](#onMouseUp)
- [onMouseDown](#onMouseDown)
- [onMouseEnter](#onMouseEnter)
- [onMouseLeave](#onMouseLeave)
- [onKeyUp](#onKeyUp)
- [onKeyDown](#onKeyDown)
- [onSizeChange](#onSizeChange)

## Reference

### visible

Whether the area can be seen.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| bool     | No           | true        |

### scrolling

If set, a scrolling area is created. The specified width and height specify the size of the inner scrolling view.

| **Type**                      | **Required** |
| ----------------------------- | ------------ |
| object {h: number, w: number} | No           |

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

Called when pressing a mouse button over the area. For a double click, the second click would fire an event with `count: 2`.

| **Type**                                                                                       | **Required** |
| ---------------------------------------------------------------------------------------------- | ------------ |
| function({x: number, y: number, width: number, height: number, button: number, count: number}) | No           |

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

| **Type**                                                                                 | **Required** |
| ---------------------------------------------------------------------------------------- | ------------ |
| function({key: string, extKey: string, modifierKey: string, modifiers: Array\<string\>}) | No           |

### onKeyDown

Called when releasing a key.
Return `true` to signal that this event got handled (always returning true will disable any menu accelerators).

| **Type**                                                                                 | **Required** |
| ---------------------------------------------------------------------------------------- | ------------ |
| function({key: string, extKey: string, modifierKey: string, modifiers: Array\<string\>}) | No           |

### onSizeChange

Called when the area's size has changed.

| **Type**                                    | **Required** |
| ------------------------------------------- | ------------ |
| function({ width: number, height: number }) | No           |
