# Native Components

**This is still experimental!**

Native components can be used by switching the backend that Proton Native uses to
wxWidgets. Currently, only a few components are supported, although this list
is constantly improving.

## Getting Started

Changing backends is relatively easy.

First install the backend.

```bash
npm i -S node-wx-napi # Install the backend
```

Then add the following to the top of your code.

```js
import { setBackend } from 'proton-native';

setBackend('wx'); // Default is 'qt'
```

## Supported Components

Only some props of style are supported and as such are
indicated in parenthesis. All sizing and placement props are supported,
but visual props, such as fontWeight and stuff are not.

| Component | Props                                   |
| --------- | --------------------------------------- |
| App       |                                         |
| Window    | style (backgroundColor), onResize       |
| View      | style (backgroundColor)                 |
| Button    | style (backgroundColor), onPress, title |
