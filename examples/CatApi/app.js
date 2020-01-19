import React, { Component } from 'react'; // import from react
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux/lib/alternate-renderers';
import thunk from 'redux-thunk';
import rootReducer from './src/reducers';
import Main from './src/components/main';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class CatApi extends Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
