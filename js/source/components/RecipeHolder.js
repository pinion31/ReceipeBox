import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import Recipe from './Recipe';
import {Button, Collapse, Well, Modal, closeButton } from 'react-bootstrap';

class RecipeHolder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      storeData:this.props.store.getlocalStorageState(), //array
      recipesComponents: this._buildRecipeComponents(this.props.store.getlocalStorageState(),this.props.dispatcher,this.deleteARecipe.bind(this),this.sendSaveDataUp.bind(this)),
      dispatch: this.props.dispatcher,
      showModal:false,
      nameOfNewRecipe:'',
      newRecipeIngredList:[],
    };
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

  _buildRecipeComponents(state, dispatchFunc, deleteFunc, saveFunc){

    let currentState = Array.from(state);
    let recipes = [];

    if (currentState.length > 0) {
      currentState.map(function(value, key) {
        recipes.push(

         <Recipe name= {value.name} dispatcher={dispatchFunc} saveCallback={saveFunc}
          ingredList = {value.ingredients} key={key} deleteRecipe={deleteFunc}>
          </Recipe>
        );
      })
    }
    return recipes;
  }

  checkDuplicates(name) {
    let state= Array.from(this.state.storeData);
    let noDuplicates = true;

    state.map((value) => {
      if (value.name === name) {
        noDuplicates = false;
        return false;
      }
    })

    return noDuplicates;

  }

   _addRecipe(e) {
    e.preventDefault();
    if (this.state.nameOfNewRecipe.length > 0) { //only adds if recipe name is not blank

      if (this.checkDuplicates(this.state.nameOfNewRecipe)) {
        this.state.storeData = this.state.dispatch(this.state.storeData, {
          type:"ADD_RECIPE",
          name:this.state.nameOfNewRecipe,
          ingredients:this.state.newRecipeIngredList,
          });

      //sets new state after adding recipe

        this.setState({
          recipesComponents: this._buildRecipeComponents(this.state.storeData,this.state.dispatch, this.deleteARecipe.bind(this), this.sendSaveDataUp.bind(this)),
          showModal:false, //closes modal after adding recipe
        });
      }
      else {
        alert("That recipe name has already been added. Please choose another name.");
      }
    }
    else {
      alert("Please Enter Recipe Name");
    }
  }


  //creates new recipe with client action
  _updateRecipeName(evt) {
    this.setState({
      nameOfNewRecipe:evt.target.value,
    });
  }

  renderRecipes() {

    this.setState({
      recipesComponents:this._buildRecipeComponents(this.state.storeData,this.props.dispatcher, this.deleteARecipe.bind(this),this.sendSaveDataUp.bind(this)),
    })

  }

  sendSaveDataUp(name, ingredients, actionType, newName="") {

  this.state.storeData = this.state.dispatch(this.state.storeData,
   { type:actionType,
     name: name,
     ingredients:ingredients,
     newName:newName,
   });

  this.renderRecipes();
  }

  printRecipes(state) {

    state.forEach(function(value) {
      console.log("current contents : " + value.name);
    })
  }

  deleteARecipe(recipeToDelete) {

    let currentState = Array.from(this.state.storeData);

    currentState = this.state.dispatch(currentState , {
      type:"DELETE_RECIPE",
      name:recipeToDelete,
      });

    let components = this._buildRecipeComponents(currentState,this.state.dispatch, this.deleteARecipe.bind(this), this.sendSaveDataUp.bind(this));

    //sets current display
    this.setState ({
      storeData:currentState,
      recipesComponents: components,
      showModal:false, //closes modal after adding recipe
    })
  }
//add initial ingredients to new recipe
  _updateIngredList(evt) {
    let newIngredList = evt.target.value.split(',');

    this.setState({
      newRecipeIngredList:newIngredList,
    });
  }

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
            <input type="text" placeholder="Recipe Name" className="name-of-recipe" onChange={this._updateRecipeName.bind(this)}/>
            <p className="modal-text">Ingredients</p>
            <textarea placeholder="Enter ingredients separated by commas" className="ingredient-text" onChange={this._updateIngredList.bind(this)}>
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