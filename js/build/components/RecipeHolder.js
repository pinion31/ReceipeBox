'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Recipe = require('./Recipe');

var _Recipe2 = _interopRequireDefault(_Recipe);

var _reactBootstrap = require('react-bootstrap');

var _RecipeModal = require('./RecipeModal');

var _RecipeModal2 = _interopRequireDefault(_RecipeModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecipeHolder = function (_Component) {
  _inherits(RecipeHolder, _Component);

  function RecipeHolder(props) {
    _classCallCheck(this, RecipeHolder);

    var _this = _possibleConstructorReturn(this, (RecipeHolder.__proto__ || Object.getPrototypeOf(RecipeHolder)).call(this, props));

    var data = JSON.parse(localStorage.getItem('data'));

    //console.log("data is" + data);

    if (!data) {
      data = [];
    } else {
      //pass _removeRecipe to be passed to RecipeHolder
      data = _this._parseStoredRecipes(data, _this._removeRecipe.bind(_this), _this.updateAllRecipes.bind(_this));
    }

    _this.state = {
      listOfRecipes: data,
      showModal: false,
      nameOfNewRecipe: '',
      newRecipeIngredList: []
    };
    return _this;
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


  _createClass(RecipeHolder, [{
    key: 'close',
    value: function close() {
      this.setState({
        showModal: false
      });
    }
  }, {
    key: 'open',
    value: function open(e) {
      e.preventDefault();
      this.setState({
        showModal: true
      });
    }
  }, {
    key: 'updateAllRecipes',
    value: function updateAllRecipes() {
      var seen = [];

      var replacer = function replacer(key, value) {
        if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object") {
          if (seen.indexOf(value) >= 0) {
            return;
          }
          seen.push(value);
        }
        return value;
      };

      localStorage.setItem('data', JSON.stringify(this.state.newListOfRecipes, replacer));
    }
  }, {
    key: '_parseStoredRecipes',
    value: function _parseStoredRecipes(storedRecipes, deleteFunction, updateFunction) {
      //data is[{"key":"1","ref":null,"props":{"name":"111111","indexOfThisRecipe":-1,"ingredList":["sdfsdf","","dfdfdfd"]},"_owner":null,"_store":{}}]
      var recipes = [];

      storedRecipes.map(function (recipe, key) {
        recipes.push(_react2.default.createElement(_Recipe2.default, { name: recipe.props["name"], removeThisReceiptCallback: deleteFunction,
          indexOfThisRecipe: key, ingredList: recipe.props["ingredList"],
          key: recipes.length + 1, updateAllRecipes: updateFunction }));
      });

      return recipes;
    }
  }, {
    key: '_addRecipe',
    value: function _addRecipe(e) {
      e.preventDefault();
      var newListOfRecipes = Array.from(this.state.listOfRecipes);
      newListOfRecipes.push(_react2.default.createElement(_Recipe2.default, { name: this.state.nameOfNewRecipe, removeThisReceiptCallback: this._removeRecipe.bind(this),
        indexOfThisRecipe: newListOfRecipes.length - 1, ingredList: this.state.newRecipeIngredList,
        updateAllRecipes: this.updateAllRecipes.bind(this), key: newListOfRecipes.length + 1 }));

      //sets new state after adding recipe
      this.setState({
        listOfRecipes: newListOfRecipes,
        showModal: false });

      var seen = [];

      var replacer = function replacer(key, value) {
        if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object") {
          if (seen.indexOf(value) >= 0) {
            return;
          }
          seen.push(value);
        }
        return value;
      };

      localStorage.setItem('data', JSON.stringify(newListOfRecipes, replacer));
    }

    //deletes recipe with client action

  }, {
    key: '_removeRecipe',
    value: function _removeRecipe(indexOfRecipeToRemove) {
      var arrToModify = Array.from(this.state.listOfRecipes);
      arrToModify.splice(indexOfRecipeToRemove, 1);

      this.setState({
        listOfRecipes: arrToModify
      });

      var seen = [];

      var replacer = function replacer(key, value) {
        if (value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == "object") {
          if (seen.indexOf(value) >= 0) {
            return;
          }
          seen.push(value);
        }
        return value;
      };

      localStorage.setItem('data', JSON.stringify(arrToModify, replacer));
    }

    //creates new recipe with client action

  }, {
    key: '_updateRecipeName',
    value: function _updateRecipeName(evt) {
      this.setState({
        nameOfNewRecipe: evt.target.value
      });
    }

    //add initial ingredients to new recipe

  }, {
    key: '_updateIngredList',
    value: function _updateIngredList(evt) {
      var newIngredList = evt.target.value.split(',');

      this.setState({
        newRecipeIngredList: newIngredList
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { id: 'recipeholder' },
          this.state.listOfRecipes.map(function (recipeIndex) {
            return recipeIndex;
          })
        ),
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'button',
            { id: 'startButton', className: 'addRecipe', type: 'submit', onClick: this.open.bind(this) },
            'Add Recipe'
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal,
          { show: this.state.showModal, onHide: this.close.bind(this) },
          _react2.default.createElement(
            _reactBootstrap.Modal.Header,
            { closeButton: true },
            _react2.default.createElement(
              _reactBootstrap.Modal.Title,
              null,
              'Add A Recipe'
            )
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Body,
            null,
            _react2.default.createElement(
              'p',
              { className: 'modal-text' },
              'Recipe'
            ),
            _react2.default.createElement('input', { type: 'text', placeholder: 'Recipe Name', id: 'name-of-recipe', onChange: this._updateRecipeName.bind(this) }),
            _react2.default.createElement(
              'p',
              { className: 'modal-text' },
              'Ingredients'
            ),
            _react2.default.createElement('textarea', { placeholder: 'Enter ingredients separated by commas', id: 'ingredient-text', onChange: this._updateIngredList.bind(this) })
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { id: 'addRecipeButton', className: 'btn btn-primary', onClick: this._addRecipe.bind(this) },
              'Add Recipe'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { id: 'CloseRecipeModal', className: 'btn btn-primary', onClick: this.close.bind(this) },
              'Close'
            )
          )
        )
      );
    }
  }]);

  return RecipeHolder;
}(_react.Component);

exports.default = RecipeHolder;