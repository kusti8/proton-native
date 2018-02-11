# Proton Native

> Create native desktop applications through a React syntax, on all platforms

## Why?

On mobile, it used to be hard to build beatiful cross-platform apps. Then React Native came along, giving us
a seamless way to build user interfaces and manage state in code, all while doing it cross platform.

On desktop, there is no such tool. You can create a GUI using something like Qt, but the code to make it is messy and unorganized.
Having made a very large GUI myself, it gets very cumbersome to manage all of that. 

Some of you might be saying that you could do it in Electron. It's a good tool, but it brings in a lot of overhead, running a full webbrowser
to manage a small GUI, while Proton Native can do the same, using native tools, with a smaller size and with less resource usage.

Proton Native does the same
to desktop that React Native did to mobile. Build cross-platform apps for the desktop, all while never leaving the React eco-system. Popular
React packages such as Redux still work.

**Compare this code in Qt (Python):**

```python
import sys
from PyQt5.QtWidgets import (QWidget, QToolTip, 
    QPushButton, QApplication)
from PyQt5.QtGui import QFont    


class Example(QWidget):
    
    def __init__(self):
        super().__init__()
        
        self.initUI()

    def print_hello(self):
        print("Hello")
        
        
    def initUI(self):
        btn = QPushButton('Button', self)
        btn.clicked.connect(self.print_hello)
        btn.resize(btn.sizeHint())
        btn.move(50, 50)       
        
        self.setGeometry(300, 300, 300, 200)
        self.setWindowTitle('Example')    
        self.show()
        
        
if __name__ == '__main__':
    
    app = QApplication(sys.argv)
    ex = Example()
    sys.exit(app.exec_())
```

**To this code using Proton Native:**

```javascript
import React, { Component } from 'react';

import { render, Window, App, Button } from 'proton-native';

class Example extends Component {
  render() {
    return (
      <App>
        <Window name="Example" height={300} width={300} menuBar={false}>
          <Button stretchy={false} onClicked={() => console.log('Hello')}>
            Button
          </Button>
        </Window>
      </App>
    );
  }
}

render(<Example />);
```

It is not only shorter, it is also easier to read and to edit, and can easily utilize the power of the state.

## Features

- Same syntax as React Native
- Works with existing React libraries such as Redux
- Cross platform
- Native components. No more Electron

## Examples

Check out [the examples](https://github.com/kusti8/proton-native/examples) to see more.