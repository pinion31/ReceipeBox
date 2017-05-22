import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import {Button, Collapse, Well, Modal, closeButton} from 'react-bootstrap';

class RecipeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show:false,
      onHideFunct: null,
      newRecipe:true,
    };
  }


  render() {
    return (
      <Modal show={this.state.show} onHide={this.state.onHideFunct}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.newRecipe?"Add A Recipe":"Edit Recipe"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="modal-text">Recipe</p>
            <input type="text" placeholder="Recipe Name" id="name-of-recipe"/>
            <p className="modal-text">Ingredients</p>
            <textarea placeholder="Enter ingredients separate by comma" id="ingredient-text"></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button id="EditRecipe">{this.state.newRecipe?"Add Recipe":"Edit Recipe"}</Button>
            <Button id="CloseRecipeModal" onClick={this.state.onHideFunct}>Close</Button>
          </Modal.Footer>
      </Modal>
    )
  }

}

export default RecipeModal
