import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
//import Bootstrap from 'bootstrap';
import $ from 'jquery';
//import Bootstrap from 'bootstrap';
import {Button, Collapse, Well, Modal, closeButton} from 'react-bootstrap';
import RecipeModal from './RecipeModal';

class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.name,
      listOfIngredients: this.props.ingredList,
      showModal:false,
      newRecipeName:this.props.name,
      newListOfIngredients:this.props.ingredList,
      deleteThisRecipe:this.props.removeThisReceiptCallback,
      indexOfThisRecipe:this.props.indexOfThisRecipe,
    }
  }

  /*
  addIngredient(nameOfIngredient) {
    let newIngredientList = Array.from(this.state.listOfIngredients);
    newIngredientList.push(<p id="ingredient" key={newIngredientList.length+1}>
      {"replace with name"}
    </p>);

    this.setState({
      listOfIngredients:newIngredientList,
    });
  }*/

  close() {
    this.setState({
      showModal:false,
      newRecipeName: this.state.recipeName,
      newListOfIngredients: this.state.listOfIngredients,
    });

  }

  open() {
    this.setState({
      showModal:true,
    });
  }

/*
  resetRecipeInfo() {
    this.setState({
     newRecipeName: this.state.recipeName,
     newListOfIngredients: this.state.listOfIngredients,
    });
  }
  */

  _updateRecipeName(evt) {
    this.setState({
      newRecipeName:evt.target.value,
    });
  }

  _updateIngredList(evt) {
    let newIngredList = evt.target.value.split(',');

    this.setState({
      newListOfIngredients:newIngredList,
    });
  }

  _submitNewRecipeInfo() {
    this.setState({
      recipeName: this.state.newRecipeName,
      listOfIngredients: this.state.newListOfIngredients,
    });

  }

  _deleteThisRecipe() {
    this.state.deleteThisRecipe(this.state.indexOfThisRecipe);
  }

  render() {
    return (
      <div>
          <Button id="recipe" onClick={() => this.setState({open:!this.state.open})}>
            <h1>{this.state.recipeName}</h1>
          </Button>

        <Collapse in={this.state.open} id="recipe-content">
          <div>
              <Well id="ingredient-space">
                <h1 id="ingredient-heading">Ingredients</h1>
                {this.state.listOfIngredients.map(function(ingredient,keyId) {
                  return (
                    <p id="ingredient" key={keyId}>
                    {ingredient}
                    </p>);
                })
                }
               <div>
                <Button id="delete" onClick={this._deleteThisRecipe.bind(this)}>Delete Recipe</Button>
                <Button id="edit" onClick={this.open.bind(this)}>Edit</Button>
               </div>
              </Well>
          </div>

        </Collapse>

        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <p className="modal-text">Recipe</p>
            <input type="text" placeholder="Recipe Name" onChange={this._updateRecipeName.bind(this)} id="name-of-recipe" value={this.state.newRecipeName}/>
            <p className="modal-text">Ingredients</p>
            <textarea placeholder="Enter ingredients separate by comma" onChange={this._updateIngredList.bind(this)} id="ingredient-text" value={this.state.newListOfIngredients}>
            </textarea>

          </Modal.Body>
          <Modal.Footer>
            <Button id="EditRecipe" className="btn btn-primary" onClick={this._submitNewRecipeInfo.bind(this)}>Edit Recipe</Button>
            <Button id="CloseRecipeModal" className="btn btn-primary" onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

/*
  render() {
    return (
      <div>
          <button id="recipe" data-toggle="collapse" data-target="#recipe-content">
            <h1>{this.state.recipeName}</h1>
          </button>

        <div id="recipe-content" className="collapse">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
      </div>
    );
  }
}

*/
export default Recipe