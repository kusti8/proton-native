# Form

A container where there is a label on the left and a component on the right.

Each form component has a single prop, `label` which sets the label to its left. It is required.

```javascript
import React, { Component } from 'react';

import { render, Window, App, Form, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{w: 500, h: 500}}>
            <Form>
                <TextInput label="Username" />
                <TextInput label="Password" secure={true} />
            </Form>
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
- [padded](#padded)

## Reference

### enabled

Whether the Form is enabled.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### visible

Whether the Form can be seen.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### padded

Whether there is padding between the components

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |