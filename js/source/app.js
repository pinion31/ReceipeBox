import React from 'react';
import ReactDOM from 'react-dom';
import RecipeHolder from './components/RecipeHolder';
import {Store} from './components/Store';

let recipeStore = new Store("myStore");

ReactDOM.render (
  <div>
  <RecipeHolder store={recipeStore}> </RecipeHolder>
  </div>,
  document.getElementById("app")
);

