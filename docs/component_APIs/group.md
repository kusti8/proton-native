# Group

A named group of components.

```javascript
import React, { Component } from 'react';

import { render, Window, App, Group, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" height={500} width={500}>
            <Group title="Login">
                <TextInput label="Username" />
                <TextInput label="Password" secure={true} />
            </Group>
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
- [margined](#margined)
- [title](#title)

## Reference

### enabled

Whether the Group is enabled.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### visible

Whether the Group can be seen.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### margined

Whether there is a margin inside the group.

| **Type** | **Required** |
| --- | --- |
| bool | No |

### title

The name of the group.

| **Type** | **Required** |
| --- | --- |
| string | No |