import React from 'react';
import ReactDOM from 'react-dom';
import RecipeHolder from './components/RecipeHolder';


const recipeStore =  {

  getlocalStorageState: () => {
    let data = localStorage.getItem('data');

    if (!data) {
      data = [];
    }

    return data;
  },

  handleAction: (state,action) => {
    let newState = Array.from(state);

    switch(action.type){
      case "ADD_RECIPE":
        newState.push({name:action.name,ingredients:action.ingredients});
        return newState;

      case "SET_INGRED":
        newState.map(function(value) {

        if (value.name === action.name) {
          vaule.ingredients = action.ingredients;
        }
        return value;
        });
        return newState;

      case "DELETE_RECIPE":
        newState = newState.filter(function(v,k) {

        if (value.name != action.name) {
        return value;
        }
        });
        return newState;
      default:
         return state;
    }
  },

  loadFromLocalStorage: () => {
    let data = localStorage.getItem('data');

    if (!data) {
      data = [];
    }

    return data;
  },

  saveToLocalStorage: (state) => {
    var seen = [];

    var replacer = function(key, value) {
      if (value != null && typeof value == "object") {
        if (seen.indexOf(value) >= 0) {
          return;
        }
        seen.push(value);
      }
      return value;
    };

    localStorage.setItem('data', JSON.stringify(state, replacer));

  },

/*
  dispatchAction: (state={}, action) => {
    return { recipes: this.handleAction(state.recipes,action)};
  },*/

}

let dispatchAction = (state=[], action) => {
    return  recipeStore.handleAction(state,action);
}

ReactDOM.render (
  <div>
  <RecipeHolder store={recipeStore} dispatcher={dispatchAction}> </RecipeHolder>
  </div>,
  document.getElementById("app")
);

