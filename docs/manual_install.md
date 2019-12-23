# Manual

To install, simply download it from NPM:
`npm i -S proton-native`

You also need to have babel-cli and these babel-presets prepared in devDependencies

`npm install --save-dev @babel/cli @babel/preset-env @babel/preset-stage-0 @babel/preset-react @babel/plugin-proposal-class-properties`

Then create `.babelrc`:

```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

And then add the following to your `package.json`:

```
  "scripts": {
    "start": "babel-node index.js"
  }
```

Now you can just run `npm run start` to run your script.

#### index.js

A usual example starts with the following, just like any other React Native app.

```javascript
import React, { Component } from 'react'; // import from react

import { AppRegistry, Window, App } from 'proton-native'; // import the proton-native components

class Example extends Component {
  render() {
    // all Components must have a render method
    return (
      <App>
        // you must always include App around everything
        <Window style={{ width: 300, height: 300 }}>
          // all your other components go here
        </Window>
      </App>
    );
  }
}

AppRegistry.registerComponent('example', <Example />); // and finally render your main component
```

Use all your usual state and component workflow.
