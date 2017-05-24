export const ADD_RECIPE ='ADD_RECIPE';
export const SET_INGRED = 'SET_INGRED';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export function addRecipe(nameOfNewRecipe) {
 return {
   type: ADD_RECIPE,
    name: nameOfNewRecipe,
  }
}

export function setIngredients(changedIngredInfo) {
 return {
   type: SET_INGRED,
    ingredients: changedIngredInfo,
  }
}

export function deleteRecipe(indexOfRecipeToDelete) {
 return {
   type: DELETE_RECIPE,
   index: indexOfRecipeToDelete,
  }
}