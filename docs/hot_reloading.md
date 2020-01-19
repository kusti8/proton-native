# Hot Reloading

Proton Native now has support for hot reloading right out of the box! This allows you to edit code
and see the results appear instantly, without modifying any of the state.

## Usage

All of this is baked into your Proton Native application when it is created with the
`proton-native-cli`.

```bash
npm run dev # Starts the server and your application with it
```

## How it works

Knowing how hot reloading works can be useful if you want to use it in
particularly advanced situations.

Hot reloading revolves around webpack. Every Proton Native application is shipped
with a default `webpack.config.js` that is suitable for most applications. It will package everything into
one JS file in the `dist/` directory, and watch for any changes.

Changes are communicated to your `index.js` file. This file renders your component,
accepts any update notifications, and if so, pulls the latest version, and forces
an update down the entire React tree. Using `react-proxy`, your state stays the same
while all necessary components are updated. `react-proxy` is baked into Proton Native,
and is only used in development mode (ie. setting `NODE_ENV` to `production` disables
hot reloading).

## Gotchas

- Don't register your component in `app.js`, only in `index.js`
- Make sure your root component is the default export in `app.js`
- This does not currently work with Redux (any help is appreciated)
- Does not work with class instance properties (due to `react-proxy`)
  - To get around this, instead create a function which returns your value. More details can be seen inside the Calculator example.
