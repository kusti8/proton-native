# Manual

To install, simply download it from NPM:
`npm i -S proton-native`

If you get an error about Python on Windows, install the build tools:
`npm install --global --production windows-build-tools`

Then create `.babelrc`:

```
{
    "presets": [
      "env",
      "stage-0",
      "react"
    ]
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

A usual example starts with the following, just like any other React Native app. Most props can be set to their defaults and not be mentioned, as shown above. The Window component actually accepts many props, but only 4 have to be specified.

``` javascript
import React, { Component } from 'react'; // import from react

import { render, Window, App } from 'proton-native'; // import the proton-native components

class Example extends Component {
  render() { // all Components must have a render method
    return (
      <App> // you must always include App around everything
        <Window title="Example" size={{w: 300, h: 300}} menuBar={false}>
            // all your other components go here
        </Window>
      </App>
    );
  }
}

render(<Example />); // and finally render your main component
```

Use all your usual state and component workflow.