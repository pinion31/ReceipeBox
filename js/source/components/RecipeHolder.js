import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import Recipe from './Recipe';
import {Button, Collapse, Well, Modal, closeButton } from 'react-bootstrap';
import RecipeModal from './RecipeModal';

class RecipeHolder extends Component {

  constructor(props) {
    super(props);

    this.state = {

      storeData:this.props.store.getlocalStorageState(), //array
      recipesComponents: [],
      dispatch: this.props.dispatcher,
      saveToLocalStorageRecipes:this.props.saveRecipes,
      saveToLocalStorageIngredients:this.props.saveIngredients,
      showModal:false,
      nameOfNewRecipe:'',
      newRecipeIngredList:[],
    };
    //this.renderRecipes().bind(this)();
    this.state.recipesComponents = this._fillWithStoredRecipes(this.props.dispatcher, this._saveWrapper.bind(this), this.deleteARecipe.bind(this));
  }

   close() {
    this.setState({
      showModal:false
    });

  }

  open(e) {
    e.preventDefault();
    this.setState({
      showModal:true,
    });
  }

  //storeData:this.props.store.getlocalStorageState(),
  //listOfRecipes: this._formatData(),
  //dispatch: this.props.store.dispatchAction,
//{recipes: [{name:cookie, ingredients:[milk,eggs]},{},]}
  _fillWithStoredRecipes(dispatchFunc, saveFunc, deleteFunc){

    let recipes = [];

    if (this.state.storeData.length > 0) {
      this.state.storeData.map(function(value, key) {
        recipes.push(
         <Recipe name= {value.name} dispatcher={dispatchFunc}
          ingredList = {value.ingredients} key={key} saveData={saveFunc}
          deleteThisRecipe = {deleteFunc}>
          </Recipe>
        );
      })
    }
    return recipes;
  }

  //
   //nameOfNewRecipe:'',
   //newRecipeIngredList:[],

   _addRecipe(e) {
    e.preventDefault();
    this.state.storeData = this.state.dispatch(this.state.storeData, {
      type:"ADD_RECIPE",
      name:this.state.nameOfNewRecipe,
      ingredients:this.state.newRecipeIngredList,
      });

    //sets new state after adding recipe
    this.setState({
      recipesComponents: this._fillWithStoredRecipes(this.state.dispatch, this._saveWrapper.bind(this), this.deleteARecipe.bind(this)),
      showModal:false, //closes modal after adding recipe
    });

    //this.renderRecipes().bind(this)();
    this.state.saveToLocalStorageRecipes(this.state.storeData);

  }

  _saveWrapper(name,ingredients) {
    this.state.saveToLocalStorageIngredients(this.state.storeData, name, ingredients);
  }

  //creates new recipe with client action
  _updateRecipeName(evt) {
    this.setState({
      nameOfNewRecipe:evt.target.value,
    });
  }

  renderRecipes() {

    this.setState({
      recipesComponents:this._fillWithStoredRecipes(this.props.dispatcher, this._saveWrapper.bind(this), this.deleteARecipe.bind(this)),
    })

  }

  deleteARecipe(recipeToDelete) {

    /*
    let currentState = Array.from(this.state.storeData);
    console.log("deleteARecipe " + recipeToDelete);
    currentState = currentState.filter(function(value) {
        if (value.name != recipeToDelete) {
          return value;
        }
    });*/
    let currentState = Array.from(this.state.storeData);

    currentState = this.state.dispatch(currentState , {
      type:"DELETE_RECIPE",
      name:recipeToDelete,
      });

    this.setState ({
      storeData:currentState,
      recipesComponents: this._fillWithStoredRecipes(this.state.dispatch, this._saveWrapper.bind(this), this.deleteARecipe),
      showModal:false, //closes modal after adding recipe
    })
    //this.renderRecipes().bind(this)();
    this.state.saveToLocalStorageRecipes(currentState);
  }
//add initial ingredients to new recipe
  _updateIngredList(evt) {
    let newIngredList = evt.target.value.split(',');

    this.setState({
      newRecipeIngredList:newIngredList,
    });
  }


  //listOfRecipes:this.props.store.getlocalStorageState(),
  //dispatch: this.props.store.dispatchAction,
  render() {
    return(
      <div >
        <div id="recipeholder">
          {this.state.recipesComponents.map(function(recipeIndex) {
              return recipeIndex;
            }
          )}
        </div>
        <form>
          <button id="startButton" className="addRecipe"  type="submit" onClick= {this.open.bind(this)}>Add Recipe</button>
        </form>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Add A Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="modal-text">Recipe</p>
            <input type="text" placeholder="Recipe Name" id="name-of-recipe" onChange={this._updateRecipeName.bind(this)}/>
            <p className="modal-text">Ingredients</p>
            <textarea placeholder="Enter ingredients separated by commas" id="ingredient-text" onChange={this._updateIngredList.bind(this)}>
            </textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button id="addRecipeButton" className="btn btn-primary" onClick={this._addRecipe.bind(this)}>Add Recipe</Button>
            <Button id="CloseRecipeModal" className="btn btn-primary"  onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default RecipeHolder