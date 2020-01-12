# Quickstart

## Note on Macs

Due to a bug in [libuv#2593](https://github.com/libuv/libuv/pull/2593) which Node.js uses ([reported in node#31328](https://github.com/nodejs/node/issues/31328)) Proton Native
does not work on Macs with Node versions >12.13.1 and >13.0.1. Until this is fixed,
it is recommended to use a Node version less than these (which can be easily
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
