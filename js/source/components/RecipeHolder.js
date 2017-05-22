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
      <Recipe name= {this.state.nameOfNewRecipe} ingredList = {this.state.newRecipeIngredList} key={newListOfRecipes.length+1}> </Recipe>
    );

    //sets new state after adding recipe
    this.setState({
      listOfRecipes: newListOfRecipes,
    });
  }

  _updateRecipeName(evt) {
    this.setState({
      nameOfNewRecipe:evt.target.value,
    })
  }

  _updateIngredList(evt) {
    let newIngredList = evt.target.value.split(',');

    this.setState({
      newRecipeIngredList:newIngredList,
    })
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
            <textarea placeholder="Enter ingredients separate by comma" id="ingredient-text" onChange={this._updateIngredList.bind(this)}>
            </textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button className="addRecipe" onClick={this._addRecipe.bind(this)}>Add Recipe</Button>
            <Button id="CloseRecipeModal" onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>

    );
  }

}

export default RecipeHolder