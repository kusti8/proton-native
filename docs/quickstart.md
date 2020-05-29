# Quickstart

## Note on Macs

Due to a bug in [libuv#2593](https://github.com/libuv/libuv/pull/2593) which Node.js uses ([reported in node#31328](https://github.com/nodejs/node/issues/31328)) Proton Native
does not work on Macs with Node versions between 12.13.1-12.16.2 and 13.0.1-13.9.0. Until this is fixed,
it is recommended to use a Node version >= 12.16.2 or >= 13.9.0 (which can be easily
installed with `nvm`).

## Prerequisites

### Linux

`qtbase5-dev`

## Install

### Automatic

```bash
# install the cli app
npx proton-native-cli init my-app
# move to your project directory
cd my-app

# run your app
npm run start
# OR to run with hot reloading
npm run dev
```
