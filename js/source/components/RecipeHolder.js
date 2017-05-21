import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
import Recipe from './Recipe';
import {Button, Collapse, Well } from 'react-bootstrap';

class RecipeHolder extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOfRecipes:[],

    };
  }

  _addRecipe(e) {
    e.preventDefault();
    let newListOfRecipes = Array.from(this.state.listOfRecipes);

    newListOfRecipes.push(
      <Recipe name= {"test"} key={newListOfRecipes.length+1}> </Recipe>
    );

    //sets new state after adding recipe
    this.setState({
      listOfRecipes: newListOfRecipes,
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
          <button id="addRecipe" type="submit" onClick= {this._addRecipe.bind(this)}>Add Recipe</button>
        </form>
      </div>

    );
  }

}

export default RecipeHolder