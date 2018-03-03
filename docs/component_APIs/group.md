# Group

A named group of components.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Group, TextInput } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{w: 500, h: 500}}>
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

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### visible

Whether the Group can be seen.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | true |

### margined

Whether there is a margin inside the group.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| bool | No | false |

### title

The name of the group.

| **Type** | **Required** | **Default** |
| --- | --- | --- |
| string | No | '' |