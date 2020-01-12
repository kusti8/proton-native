# Native Components

**This is still experimental!**

Native components can be used by switching the backend that Proton Native uses to
wxWidgets. Currently, only a few components are supported, although this list
is constantly improving.

## Note on Macs

Due to a bug in [libuv#2593](https://github.com/libuv/libuv/pull/2593) which Node.js uses ([reported in node#31328](https://github.com/nodejs/node/issues/31328)) Proton Native
does not work on Macs with Node versions >12.13.1 and >13.0.1. Until this is fixed,
it is recommended to use a Node version less than these (which can be easily
installed with `nvm`).

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
