# External Functionality

Some functionality will probably never make it to Proton Native, but that doesn't mean that it isn't possible.
This is a list of external tools found that help common tasks. **All of these are designed to be cross platform.**

## Tools

- [System Tray](#System-Tray)
- [Notifications](#Notifications)

## System Tray

https://zaaack.github.io/node-systray/index.html

```jsx
import React, { Component } from 'react';
import SysTray from 'systray';
import fs from 'fs';

import { AppRegistry, Window, App, View, TextInput } from 'proton-native';

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
      <App>
        <Window style={{ width: 400, height: 400 }}>
          <View>
            <TextInput />
          </View>
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('example', <Example />);
```

## Notifications

https://github.com/mikaelbr/node-notifier
