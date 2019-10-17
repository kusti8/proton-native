# Styled

A wrapper around Area.Text without the need to explicitly create an Area component.

```jsx
import React, { Component } from 'react';

import { render, Window, App, StyledText, Box } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window title="Test" size={{ w: 400, h: 400 }} margined>
          <Box>
            <StyledText style={{ fontSize: 16 }}>
              This is some text drawn onto an{' '}
              <StyledText style={{ color: 'red' }}>Area!</StyledText>
            </StyledText>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Props

For props, see [Area.Text](component_APIs/area_text.md#Props)
