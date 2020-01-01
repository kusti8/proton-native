import React from 'react';
import { AppRegistry } from 'proton-native';
import Calculator from './app';

AppRegistry.registerComponent('calculator', <Calculator />); // and finally render your main component

// ================================================================================
// This is for hot reloading (this will be stripped off in production by webpack)
// THIS SHOULD NOT BE CHANGED
if (module.hot) {
  module.hot.accept(['./app'], function() {
    const app = require('./app')['default'];
    AppRegistry.updateProxy(app);
  });
}
