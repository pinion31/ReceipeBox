import React from 'react';
import ReactDOM from 'react-dom';
import RecipeHolder from './components/RecipeHolder';


const recipeStore =  {

  getlocalStorageState: () => {
    let data = JSON.parse(localStorage.getItem('data'));

    if (!data) {
      data = [];
    }

    return data;
  },

  handleAction: (state,action, save) => {
    let newState = Array.from(state);

    switch(action.type){
      case "ADD_RECIPE":

        //filter ending commas
        let newIngredList = action.ingredients.filter(function(value){
          if (value.length > 0) {
            return value;
          }
        });

        newState.push({name:action.name,ingredients:newIngredList});
        save(newState);
        return newState;

     /* case "SET_INGRED":
        newState.map(function(value) {

          if (value.name === action.name) {
            value.ingredients = action.ingredients;

            return value;
          }
          });

        save(newState);
        return newState;
  */
      case "DELETE_RECIPE":
        newState = newState.filter(function(value,k) {

          if (value.name != action.name) {
            return value;
          }
          });
        save(newState);
        return newState;
     /* case "RENAME_RECIPE":
        newState.map(function(value){
          if (value.name === action.name) {
            value.name = action.newName;
          }
          });
        save(newState);
        return newState;*/
      case "UPDATE_RECIPE":
         newState.map(function(value){
          if (value.name === action.name) {
            value.name = action.newName;
            value.ingredients = action.ingredients;
          }
          });
          save(newState);
         return newState;
      default:
         return state;
    }
  },

  loadFromLocalStorage: () => {
    let data = JSON.parse(localStorage.getItem('data'));

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
}

let dispatchAction = (state=[], action) => {
    return  recipeStore.handleAction(state,action, recipeStore.saveToLocalStorage);
}

ReactDOM.render (
  <div>
  <RecipeHolder store={recipeStore} dispatcher={dispatchAction}>
   </RecipeHolder>
  </div>,
  document.getElementById("app")
);

