# Proton Native

> Create desktop applications with React Native components, on all platforms

<img src="calculator.png" alt="calculator" width="200"/>
<img src="catapi_v2.png" alt="catapi_v2" height="300"/>

## What's new in V2?

V2 brought along a complete overhaul, written from the ground up. The source code is better organized, we now support flexbox layout, CSS
styling, the same components as React Native, hot reloading, and are working on unit testing. More components and features can now be added easily. It is easier to install, with no compiling required.

For the user,
you can now copy and paste your React Native code with minimal to no changes. For our collaborators, it should now be more easy and friendly to
bring this project right in line as the desktop port of React Native.

For more information and a full writeup, see the [V2 page](v2_changes.md).

## Native Components?

Currently we use Qt, which does not ship with true native components. Performance is basically the same and the look is very similar on almost all
platforms, but we realize there is still a large demand for true native components in this project. There is a current experimental
backend for wxWidgets and is described [here](wx_backend.md). Please note this is very not complete and still needs a lot more work.

## Why?

On mobile, it used to be hard to build beautiful cross-platform apps. Then React Native came along, giving us
a seamless way to build user interfaces and manage state in code, all while doing it cross platform.

On desktop, there is no such tool. You can create a GUI using something like Qt, but for people who are used to the React workflow and JSX, there currently isn't an alternative.

Some of you might be saying that you could do it in Electron. It's a good tool, but it brings in a lot of overhead, running a full webbrowser
to manage a small GUI, while Proton Native can do the same, using native tools, with a smaller size and with less resource usage.

Proton Native does the same
to desktop that React Native did to mobile. Build cross-platform apps for the desktop, all while never leaving the React eco-system. Popular
React packages such as Redux still work.

**Here's a simple example in Proton Native:**

[js_example.js](js_example.js ':include :type=code jsx')

## Features

- Same syntax and components as React Native
- Works with existing React libraries such as Redux
- Cross platform
- No more Electron
- Compatible with all normal Node.js packages
- Hot reloading
- Flexbox
- CSS styling

## Examples

Check out [the examples](https://github.com/kusti8/proton-native/tree/master/examples) to see more.

<a href="https://www.keycdn.com/"><sub><sup>Accelerated by KeyCDN</sup></sub></a>
