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

  handleAction: function handleAction(state, action, save) {
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
        newState = newState.filter(function (value, k) {

          if (value.name != action.name) {
            console.log("returning value " + value.name);
            console.log("returning action" + action.name);
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
        newState.map(function (value) {
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
  }
};

var dispatchAction = function dispatchAction() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  return recipeStore.handleAction(state, action, recipeStore.saveToLocalStorage);
};

_reactDom2.default.render(_react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(_RecipeHolder2.default, { store: recipeStore, dispatcher: dispatchAction })
), document.getElementById("app"));