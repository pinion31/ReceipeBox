
class Store {

  //{recipes: [{name:cookie, ingredients:[milk,eggs]},{},]}
  constructor(name) {
    //constructor(super);
    this.name = name;
    this.recipes = {recipes:[]};
  }

  dispatchAction(state={}, action) {
    return { recipes:handleAction(state.recipes,action)};
  }



  getlocalStorageState() {
    let data = JSON.parse(localStorage.getItem('data'));

    if (!data) {
      data = [];
    }

    return data;
  }

  handleAction(state,action) {
    let newState = Object.assign({},state);

    switch(action.type){
      case "ADD_RECIPE":
        newState.recipes.push({name:action.name,ingredients:action.ingredients});
        return newState;

      case "SET_INGRED":
        newState.recipes.map(function(value) {

        if (value.name === action.name) {
          vaule.ingredients = action.ingredients;
        }
        return value;
        });
        return newState;

      case "DELETE_RECIPE":
        newState.recipes = newState.recipes.filter(function(v,k) {

        if (value.name != action.name) {
        return value;
        }
        });
        return newState;
      default:
         return state;
    }
  }

   loadFromLocalStorage() {
    let data = JSON.parse(localStorage.getItem('data'));

    if (!data) {
      data = [];
    }

    return data;
  }

  saveToLocalStorage(state) {
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

  }


}

export default Store