# Grid

A grid where components can be placed in rows and columns. 

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

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Form can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### padded

Whether there is padding between the components

| **Type** | **Required** |
| --- | --- |
| bool | No |