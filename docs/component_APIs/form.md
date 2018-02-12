# Form

A container where there is a label on the left and a component on the right.

```javascript
import React, { Component } from 'react';

import { render, Window, App, Form, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
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

- [vertical](#vertical)
- [enabled](#enabled)
- [visible](#visible)

## Reference

### vertical

Whether the line is vertical or horizontal.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### enabled

Whether the Separator is enabled.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Separator can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |