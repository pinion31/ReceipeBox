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

    }
  }

  addIngredient(nameOfIngredient) {
    let newIngredientList = Array.from(this.state.listOfIngredients);
    newIngredientList.push(<p id="ingredient" key={newIngredientList.length+1}>
      {"replace with name"}
    </p>);

    this.setState({
      listOfIngredients:newIngredientList,
    });
  }

  close() {
    this.setState({
      showModal:false
    });

  }

  open() {
    this.setState({
      showModal:true
    });
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
                <Button id="delete">Delete Recipe</Button>
                <Button id="edit" onClick={this.open.bind(this)} >Edit</Button>
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
            <input type="text" placeholder="Recipe Name" id="name-of-recipe" value={this.state.recipeName}/>
            <p className="modal-text">Ingredients</p>
            <textarea placeholder="Enter ingredients separate by comma" id="ingredient-text" value={this.state.listOfIngredients}></textarea>

          </Modal.Body>
          <Modal.Footer>
            <Button id="EditRecipe">Edit Recipe</Button>
            <Button id="CloseRecipeModal" onClick={this.close.bind(this)}>Close</Button>
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