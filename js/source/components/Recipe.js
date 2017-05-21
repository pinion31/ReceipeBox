import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';
//import Bootstrap from 'bootstrap';
import $ from 'jquery';
//import Bootstrap from 'bootstrap';
import {Button, Collapse, Well } from 'react-bootstrap';

class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.name,
      listOfIngredients:[<p id="ingredient" key={1}>first ingredient</p>],

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
                {this.state.listOfIngredients.map(function(ingredient,key) {
                  return ingredient;
                })
                }
               <div>
                <Button id="delete">Delete Recipe</Button>
                <Button id="edit">Edit</Button>
               </div>
              </Well>
          </div>

        </Collapse>
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