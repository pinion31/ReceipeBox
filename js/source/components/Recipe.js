import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import $ from 'jquery';
import {Button, Collapse, Well, Modal, closeButton} from 'react-bootstrap';

class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.name,
      listOfIngredients: this.props.ingredList,
      showModal:false,
      newRecipeName:this.props.name,
      newListOfIngredients:this.props.ingredList,
      dispatch: this.props.dispatcher,
      deleteRecipe:this.props.deleteRecipe,
      saveCallback:this.props.saveCallback,
    }
  }

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
     //remove empty ingredients
    let newIngredList = this.state.newListOfIngredients.filter(function(value){
      if (value.length > 0) {
        return value;
    }
    });

    if (this.state.newRecipeName.length > 0) {

      this.setState({
          showModal:false,
        });

      this.state.saveCallback(this.state.recipeName, newIngredList, "UPDATE_RECIPE",this.state.newRecipeName );
    }
    else {
      alert("Please Enter Recipe Name");
    }
  }

  deleteThisRecipe() {
    this.state.deleteRecipe(this.props.name);
  }

  //use props here instead of this.state like this.props.name because state
  //is not updated fast enough
  // localStorage was being updated correctly but not the current DOM


  render() {
    return (
      <div>
          <Button id="recipe" onClick={() => this.setState({open:!this.state.open})}>
            <h1>{this.props.name}</h1>
          </Button>

        <Collapse in={this.state.open} className="recipe-content">
          <div>
              <Well id="ingredient-space">
                <h1 className="ingredient-heading">Ingredients</h1>
                {

                  this.props.ingredList.map(function(ingredient,keyId) {
                  return (
                    <p className="ingredient" key={keyId}>
                    {ingredient}
                    </p>);
                })

                }
               <div>
                <Button id="delete" onClick={this.deleteThisRecipe.bind(this)}>Delete Recipe</Button>
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
            <input type="text" placeholder="Recipe Name" onChange={this._updateRecipeName.bind(this)} className="name-of-recipe" value={this.state.newRecipeName} required/>
            <p className="modal-text">Ingredients</p>
            <textarea placeholder="Enter ingredients separate by comma" onChange={this._updateIngredList.bind(this)} className="ingredient-text" value={this.state.newListOfIngredients}>
            </textarea>

          </Modal.Body>
          <Modal.Footer>
            <Button  className="btn btn-primary" onClick={this._submitNewRecipeInfo.bind(this)}>Edit Recipe</Button>
            <Button  className="btn btn-primary" onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>
    );
  }
}

export default Recipe