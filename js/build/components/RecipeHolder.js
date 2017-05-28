'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Recipe = require('./Recipe');

var _Recipe2 = _interopRequireDefault(_Recipe);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecipeHolder = function (_Component) {
  _inherits(RecipeHolder, _Component);

  function RecipeHolder(props) {
    _classCallCheck(this, RecipeHolder);

    var _this = _possibleConstructorReturn(this, (RecipeHolder.__proto__ || Object.getPrototypeOf(RecipeHolder)).call(this, props));

    _this.state = {
      storeData: _this.props.store.getlocalStorageState(), //array
      recipesComponents: _this._buildRecipeComponents(_this.props.store.getlocalStorageState(), _this.props.dispatcher, _this.deleteARecipe.bind(_this), _this.sendSaveDataUp.bind(_this)),
      dispatch: _this.props.dispatcher,
      showModal: false,
      nameOfNewRecipe: '',
      newRecipeIngredList: []
    };
    return _this;
  }

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
    key: '_buildRecipeComponents',
    value: function _buildRecipeComponents(state, dispatchFunc, deleteFunc, saveFunc) {

      var currentState = Array.from(state);
      var recipes = [];

      if (currentState.length > 0) {
        currentState.map(function (value, key) {
          recipes.push(_react2.default.createElement(_Recipe2.default, { name: value.name, dispatcher: dispatchFunc, saveCallback: saveFunc,
            ingredList: value.ingredients, key: key, deleteRecipe: deleteFunc }));
        });
      }
      return recipes;
    }
  }, {
    key: 'checkDuplicates',
    value: function checkDuplicates(name) {
      var state = Array.from(this.state.storeData);
      var noDuplicates = true;

      state.map(function (value) {
        if (value.name === name) {
          noDuplicates = false;
          return false;
        }
      });

      return noDuplicates;
    }
  }, {
    key: '_addRecipe',
    value: function _addRecipe(e) {
      e.preventDefault();
      if (this.state.nameOfNewRecipe.length > 0) {
        //only adds if recipe name is not blank

        if (this.checkDuplicates(this.state.nameOfNewRecipe)) {
          this.state.storeData = this.state.dispatch(this.state.storeData, {
            type: "ADD_RECIPE",
            name: this.state.nameOfNewRecipe,
            ingredients: this.state.newRecipeIngredList
          });

          //sets new state after adding recipe

          this.setState({
            recipesComponents: this._buildRecipeComponents(this.state.storeData, this.state.dispatch, this.deleteARecipe.bind(this), this.sendSaveDataUp.bind(this)),
            showModal: false });
        } else {
          alert("That recipe name has already been added. Please choose another name.");
        }
      } else {
        alert("Please Enter Recipe Name");
      }
    }

    //creates new recipe with client action

  }, {
    key: '_updateRecipeName',
    value: function _updateRecipeName(evt) {
      this.setState({
        nameOfNewRecipe: evt.target.value
      });
    }
  }, {
    key: 'renderRecipes',
    value: function renderRecipes() {

      this.setState({
        recipesComponents: this._buildRecipeComponents(this.state.storeData, this.props.dispatcher, this.deleteARecipe.bind(this), this.sendSaveDataUp.bind(this))
      });
    }
  }, {
    key: 'sendSaveDataUp',
    value: function sendSaveDataUp(name, ingredients, actionType) {
      var newName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";


      this.state.storeData = this.state.dispatch(this.state.storeData, { type: actionType,
        name: name,
        ingredients: ingredients,
        newName: newName
      });

      this.renderRecipes();
    }
  }, {
    key: 'printRecipes',
    value: function printRecipes(state) {

      state.forEach(function (value) {
        console.log("current contents : " + value.name);
      });
    }
  }, {
    key: 'deleteARecipe',
    value: function deleteARecipe(recipeToDelete) {

      var currentState = Array.from(this.state.storeData);

      currentState = this.state.dispatch(currentState, {
        type: "DELETE_RECIPE",
        name: recipeToDelete
      });

      var components = this._buildRecipeComponents(currentState, this.state.dispatch, this.deleteARecipe.bind(this), this.sendSaveDataUp.bind(this));

      //sets current display
      this.setState({
        storeData: currentState,
        recipesComponents: components,
        showModal: false });
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
          this.state.recipesComponents.map(function (recipeIndex) {
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
            _react2.default.createElement('input', { type: 'text', placeholder: 'Recipe Name', className: 'name-of-recipe', onChange: this._updateRecipeName.bind(this) }),
            _react2.default.createElement(
              'p',
              { className: 'modal-text' },
              'Ingredients'
            ),
            _react2.default.createElement('textarea', { placeholder: 'Enter ingredients separated by commas', className: 'ingredient-text', onChange: this._updateIngredList.bind(this) })
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