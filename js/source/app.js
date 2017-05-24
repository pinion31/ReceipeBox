import React from 'react';
import ReactDOM from 'react-dom';
import RecipeHolder from './components/RecipeHolder';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import handleAction from './reducers';

let store = createStore(handleAction);

ReactDOM.render (
  <div>
  <Provider store={store}>
  <RecipeHolder store={store}> </RecipeHolder>
  </Provider>
  </div>,
  document.getElementById("app")
);

