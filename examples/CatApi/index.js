import React, { Component } from 'react'; // import from react
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers';
import Main from './src/components/main';
import { AppRegistry } from '../../bin'; // import the proton-native components

const store = createStore(rootReducer, applyMiddleware(thunk));

class CatApi extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('CatApi', <CatApi />); // and finally render your main component
