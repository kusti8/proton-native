# RadioButtons

A choice between multiple options.

Every child must be a RadioButtons.Item, that requires a string child that is the label to display to the right of the RadioButton.

```javascript
import React, { Component } from 'react';

import { render, Window, App, RadioButtons } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
          <RadioButtons>
            <RadioButtons.Item>Option 1</RadioButtons.Item>
            <RadioButtons.Item>Option 2</RadioButtons.Item>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [enabled](#enabled)
- [visible](#visible)
- [selected](#selected)
- [onSelected](#onSelected)

## Reference

### enabled

Whether the RadioButtons can be used.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the RadioButtons can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### selected

What RadioButton is selected, zero-indexed. -1 means nothing is selected.

| **Type** | **Required** |
| --- | --- |
| number | No |

### onSelected

Called when a RadioButton is selected. The number selected is passed as an argument.

| **Type** | **Required** |
| --- | --- |
| function(selected) | No |