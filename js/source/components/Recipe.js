import React from 'react';
import ReactDOM from 'react-dom';
import {Component, PropTypes} from 'react';

class Recipe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recipeName: this.props.name,

    };
  }

  render() {
    return (
      <div id= "recipe">
        <h1>{this.state.recipeName}</h1>
      </div>
    );
  }
}

export default Recipe