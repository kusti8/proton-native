# External Functionality

Some functionality will probably never make it to Proton Native, but that doesn't mean that it isn't possible.
This is a list of external tools found that help common tasks. **All of these are designed to be cross platform.**

## Tools

* [System Tray](#System-Tray)
* [Notifications](#Notifications)

## System Tray

https://zaaack.github.io/node-systray/index.html

```jsx
import React, { Component } from 'react';
import SysTray from 'systray';
import fs from 'fs';

import { render, Window, App, Box, TextInput, Menu } from 'proton-native';

const systray = new SysTray({
  menu: {
    // you should using .png icon in macOS/Linux, but .ico format in windows
    icon: new Buffer(fs.readFileSync('/.../icon.png')).toString('base64'),
    title: 'Test',
    tooltip: 'Tips',
    items: [
      {
        title: 'Item',
        tooltip: 'Item Tooltip',
        enabled: true,
      },
      {
        title: 'Exit',
        tooltip: 'bb',
        enabled: true,
      },
    ],
  },
  debug: false,
  copyDir: true,
});

systray.onClick(action => {
  if (action.seq_id === 0) {
    console.log('Hi!');
  } else if (action.seq_id === 1) {
    systray.kill();
  }
});

const stop = () => {
  systray.kill(false);
};

class Example extends Component {
  render() {
    return (
      <App onShouldQuit={stop}>
        <Menu>
          <Menu.Item type="Quit" />
        </Menu>
        <Window
          onClose={stop}
          title="Proton Native Rocks!"
          size={{ w: 400, h: 400 }}
          menuBar={false}
        >
          <Box>
            <TextInput>Hi</TextInput>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

## Notifications

https://github.com/mikaelbr/node-notifier
