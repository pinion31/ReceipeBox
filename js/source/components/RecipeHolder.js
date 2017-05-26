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
      recipesComponents: this._buildRecipeComponents(this.props.store.getlocalStorageState(),this.props.dispatcher,this.deleteARecipe.bind(this)),
      dispatch: this.props.dispatcher,
      showModal:false,
      nameOfNewRecipe:'',
      newRecipeIngredList:[],
    };
    //this.renderRecipes().bind(this)();
    //this.state.recipesComponents = this._buildRecipeComponents(this.props.dispatcher);
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
  _buildRecipeComponents(state, dispatchFunc){

    let currentState = Array.from(state);
    let recipes = [];

    if (currentState.length > 0) {
      currentState.map(function(value, key) {
        recipes.push(
         <Recipe name= {value.name} dispatcher={dispatchFunc}
          ingredList = {value.ingredients} key={key}>
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
      recipesComponents: this._buildRecipeComponents(this.state.storeData,this.state.dispatch, this.deleteARecipe.bind(this)),
      showModal:false, //closes modal after adding recipe
    });

    //this.renderRecipes().bind(this)();


  }


  //creates new recipe with client action
  _updateRecipeName(evt) {
    this.setState({
      nameOfNewRecipe:evt.target.value,
    });
  }

  renderRecipes() {

    this.setState({
      recipesComponents:this._buildRecipeComponents(this.state.storeData,this.props.dispatcher, this.deleteARecipe.bind(this)),
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
      recipesComponents: this._buildRecipeComponents(this.state.storeData,this.state.dispatch, this.deleteARecipe.bind(this)),
      showModal:false, //closes modal after adding recipe
    })
    //this.renderRecipes().bind(this)();

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