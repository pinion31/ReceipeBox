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
      listOfRecipes:[],
      showModal:false,
      nameOfNewRecipe:'',
      newRecipeIngredList:[],
    };
  }

/*
  _addRecipe(e) {
    e.preventDefault();
    let newListOfRecipes = Array.from(this.state.listOfRecipes);

    newListOfRecipes.push(
      <Recipe name= {"Pudding"} key={newListOfRecipes.length+1}> </Recipe>
    );

    //sets new state after adding recipe
    this.setState({
      listOfRecipes: newListOfRecipes,
    });
  }
*/
   close() {
    this.setState({
      showModal:false
    });

  }

  open(e) {
    e.preventDefault();
    this.setState({
      showModal:true
    });
  }

   _addRecipe(e) {
    e.preventDefault();
    let newListOfRecipes = Array.from(this.state.listOfRecipes);
    newListOfRecipes.push(
      <Recipe name= {this.state.nameOfNewRecipe} removeThisReceiptCallback={this._removeRecipe.bind(this)}
      indexOfThisRecipe={newListOfRecipes.length-1} ingredList = {this.state.newRecipeIngredList}
       key={newListOfRecipes.length+1}>
       </Recipe>
    );

    //sets new state after adding recipe
    this.setState({
      listOfRecipes: newListOfRecipes,
      showModal:false, //closes modal after adding recipe
    });
  }

  //deletes recipe with client action
  _removeRecipe(indexOfRecipeToRemove){
    let arrToModify = Array.from(this.state.listOfRecipes);
    arrToModify.splice(indexOfRecipeToRemove,1);

    this.setState({
      listOfRecipes: arrToModify,
    });
  }

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

  render() {
    return(
      <div >
        <div id="recipeholder">
          {this.state.listOfRecipes.map(function(recipeIndex) {
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