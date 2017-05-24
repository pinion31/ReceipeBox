
//export const ADD_RECIPE ='ADD_RECIPE';
//export const SET_INGRED = 'SET_INGRED';
//export const DELETE_RECIPE = 'DELETE_RECIPE';

const initialState = {
  recipes:[],
}



/*
function addRecipeList(state=initialState, action, newInfoToAdd) {

  switch (action.type){
    case ADD_RECIPE:
      return
        Object.assign({}, state, {
          recipe: [...state.recipes,
            newInfoToAdd],
          ingredients:state.ingredients
        });

    case SET_INGRED:
      return Object.assign({}, state, {
          recipe: state.recipes,
          ingredients:[state.ingredients
        });
    case DELETE_RECIPE:
      return
    default:
      return state
  }
*/

/*
  example:
  recipes = [[{name: cookies}, {ingredients:[milk,eggs]}],
  [{name: hot dog}, {ingredients:[buns,mustard, wiener]}]]
*/

const handleAction = function (state=initialState, action) { //index=-1, newRecipe="", newIngredients=[])  {
   let recipes =  Array.from(state);
  switch (action.type) {
    case ADD_RECIPE:
      //let recipesCopy = Array.from(state);
      recipes.push({
        name:action.name,
        ingredients: action.ingredients,
        });
      return recipes;
    case DELETE_RECIPE:
      //let recipes = Array.from(state);
      recipes = recipes.filter(function(value,key) {
        if (value.name != action.name) {
          return value;
        }
        });
      return recipes;
    case SET_INGRED:
      recipes.map(function(value, key){
        if (action.name === value.name) {
          value.ingredients = Array.from(action.ingredients);
        }
        });
      return recipes;
    default:
      return state;

  }
}

export default handleAction

