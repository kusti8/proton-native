# Text

Displays some text.

```jsx
import React, { Component } from 'react';

import { render, Window, App, Text } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Example" size={{ w: 500, h: 500 }}>
          <Text>Hello!</Text>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

- [children](#children)

## Reference

### children

The text to display.

| **Type** | **Required** | **Default** |
| -------- | ------------ | ----------- |
| string   | No           | ''          |
