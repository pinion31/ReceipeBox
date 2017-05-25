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
      showModal:false,
      nameOfNewRecipe:'',
      newRecipeIngredList:[],
    };

    this.state.recipesComponents = this._fillWithStoredRecipes();
    console.log(this.state.storeData);
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
  _fillWithStoredRecipes(){
    //data is[{"key":"1","ref":null,"props":{"name":"111111","indexOfThisRecipe":-1,"ingredList":["sdfsdf","","dfdfdfd"]},"_owner":null,"_store":{}}]
    let recipes = [];

    console.log("state = " + this.state);
    console.log("data = " + this.state.storeData);
    if (this.state.storeData.length > 0) {
      this.state.storeData.map(function(value, key) {
        recipes.push(
         <Recipe name= {value.name} dispatcher={this.state.dispatch.bind(this)}
          ingredList = {value.ingredients}>
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
      recipesComponents: this._fillWithStoredRecipes(),
      showModal:false, //closes modal after adding recipe
    });


  }

  //deletes recipe with client action
  /*
  _removeRecipe(indexOfRecipeToRemove){
    let arrToModify = Array.from(this.state.listOfRecipes);
    arrToModify.splice(indexOfRecipeToRemove,1);

    this.setState({
      listOfRecipes: arrToModify,
    });

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

    localStorage.setItem('data', JSON.stringify(arrToModify,replacer));

  }
*/
  //creates new recipe with client action
  _updateRecipeName(evt) {
    this.setState({
      nameOfNewRecipe:evt.target.value,
    });
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