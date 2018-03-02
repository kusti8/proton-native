# Menu.Item

A single item in a [Menu](menu.md).

```javascript
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

- [type](#type)
- [children](#children)
- [checked](#checked)
- [onClick](#onClick)

## Reference

### type

How the menu item is displayed.

- `Check` - a checkable option in the menu.
- `Quit` - a Quit button. This accepts no text.
- `About` - an About button. This accepts no text.
- `Preferences` - a Preferences button. This accepts no text.
- `Separator` - a Separator between menu items. This accepts no text.
- `Item` - a normal menu button. This is the default

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| enum('Check', 'Quit', 'About', 'Preferences', 'Separator', 'Item') | No | 'Item' |

### children

The text to display for the menu item.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| string | No | '' |

### checked

If the type is `Check`, then set whether it is checked or not. 

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### onClick

Called when the menu item is clicked. If the type is `Check`, then it passes whether it is checked as an argument.

| **Type** | **Required** |
| --- | --- |
| function(checked) | No |