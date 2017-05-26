'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _RecipeHolder = require('./components/RecipeHolder');

var _RecipeHolder2 = _interopRequireDefault(_RecipeHolder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipeStore = {

  getlocalStorageState: function getlocalStorageState() {
    var data = JSON.parse(localStorage.getItem('data'));

    if (!data) {
      data = [];
    }

    return data;
  },

  handleAction: function handleAction(state, action) {
    var newState = Array.from(state);

    switch (action.type) {
      case "ADD_RECIPE":

        //filter ending commas
        var newIngredList = action.ingredients.filter(function (value) {
          if (value.length > 0) {
            return value;
          }
        });

        newState.push({ name: action.name, ingredients: newIngredList });
        return newState;

      case "SET_INGRED":
        newState.map(function (value) {

          if (value.name === action.name) {
            vaule.ingredients = action.ingredients;
          }
          return value;
        });
        return newState;

      case "DELETE_RECIPE":
        newState = newState.filter(function (value, k) {

          if (value.name != action.name) {
            return value;
          }
        });
        return newState;
      default:
        return state;
    }
  },

  loadFromLocalStorage: function loadFromLocalStorage() {
    var data = JSON.parse(localStorage.getItem('data'));

    if (!data) {
      data = [];
    }

    return data;
  },

  saveToLocalStorage: function saveToLocalStorage(state) {
    var seen = [];

    var replacer = function replacer(key, value) {
      if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object") {
        if (seen.indexOf(value) >= 0) {
          return;
        }
        seen.push(value);
      }
      return value;
    };

    localStorage.setItem('data', JSON.stringify(state, replacer));
  },

  //callback from recipeholder to save ingredients to local storage
  saveIngredientsFromRecipe: function saveIngredientsFromRecipe(state, nameofRecipe, ingredients) {

    var currentState = Array.from(state);

    currentState.map(function (value) {
      if (value.name === nameofRecipe) {
        value.ingredients = ingredients;
      }
    });

    var seen = [];

    var replacer = function replacer(key, value) {
      if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object") {
        if (seen.indexOf(value) >= 0) {
          return;
        }
        seen.push(value);
      }
      return value;
    };

    localStorage.setItem('data', JSON.stringify(currentState, replacer));
  }

};

var dispatchAction = function dispatchAction() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  return recipeStore.handleAction(state, action);
};

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(
    _RecipeHolder2.default,
    { store: recipeStore, dispatcher: dispatchAction,
      saveIngredients: recipeStore.saveIngredientsFromRecipe,
      saveRecipes: recipeStore.saveToLocalStorage },
    ' '
  )
), document.getElementById("app"));