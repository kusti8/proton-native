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

[python_example.py](python_example.py ':include :type=code python')

**To this code using Proton Native:**

[js_example.js](js_example.js ':include :type=code jsx')

It is easier to see heirarchy and what is occurring, and can easily utilize the power of the state.

## Features

- Same syntax as React Native
- Works with existing React libraries such as Redux
- Cross platform
- Native components. No more Electron
- Compatible with all normal Node.js packages

## Examples

Check out [the examples](https://github.com/kusti8/proton-native/tree/master/examples) to see more.

<a href="https://www.keycdn.com/"><sub><sup>Accelerated by KeyCDN</sup></sub></a>
