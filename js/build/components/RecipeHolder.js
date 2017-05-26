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

    _this.state = {

      storeData: _this.props.store.getlocalStorageState(), //array
      recipesComponents: [],
      dispatch: _this.props.dispatcher,
      saveToLocalStorageRecipes: _this.props.saveRecipes,
      saveToLocalStorageIngredients: _this.props.saveIngredients,
      showModal: false,
      nameOfNewRecipe: '',
      newRecipeIngredList: []
    };
    //this.renderRecipes().bind(this)();
    _this.state.recipesComponents = _this._fillWithStoredRecipes(_this.props.dispatcher, _this._saveWrapper.bind(_this), _this.deleteARecipe.bind(_this));
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

    //storeData:this.props.store.getlocalStorageState(),
    //listOfRecipes: this._formatData(),
    //dispatch: this.props.store.dispatchAction,
    //{recipes: [{name:cookie, ingredients:[milk,eggs]},{},]}

  }, {
    key: '_fillWithStoredRecipes',
    value: function _fillWithStoredRecipes(dispatchFunc, saveFunc, deleteFunc) {

      var recipes = [];

      if (this.state.storeData.length > 0) {
        this.state.storeData.map(function (value, key) {
          recipes.push(_react2.default.createElement(_Recipe2.default, { name: value.name, dispatcher: dispatchFunc,
            ingredList: value.ingredients, key: key, saveData: saveFunc,
            deleteThisRecipe: deleteFunc }));
        });
      }
      return recipes;
    }

    //
    //nameOfNewRecipe:'',
    //newRecipeIngredList:[],

  }, {
    key: '_addRecipe',
    value: function _addRecipe(e) {
      e.preventDefault();
      this.state.storeData = this.state.dispatch(this.state.storeData, {
        type: "ADD_RECIPE",
        name: this.state.nameOfNewRecipe,
        ingredients: this.state.newRecipeIngredList
      });

      //sets new state after adding recipe
      this.setState({
        recipesComponents: this._fillWithStoredRecipes(this.state.dispatch, this._saveWrapper.bind(this), this.deleteARecipe.bind(this)),
        showModal: false });

      //this.renderRecipes().bind(this)();
      this.state.saveToLocalStorageRecipes(this.state.storeData);
    }
  }, {
    key: '_saveWrapper',
    value: function _saveWrapper(name, ingredients) {
      this.state.saveToLocalStorageIngredients(this.state.storeData, name, ingredients);
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
        recipesComponents: this._fillWithStoredRecipes(this.props.dispatcher, this._saveWrapper.bind(this), this.deleteARecipe.bind(this))
      });
    }
  }, {
    key: 'deleteARecipe',
    value: function deleteARecipe(recipeToDelete) {

      /*
      let currentState = Array.from(this.state.storeData);
      console.log("deleteARecipe " + recipeToDelete);
      currentState = currentState.filter(function(value) {
          if (value.name != recipeToDelete) {
            return value;
          }
      });*/
      var currentState = Array.from(this.state.storeData);

      currentState = this.state.dispatch(currentState, {
        type: "DELETE_RECIPE",
        name: recipeToDelete
      });

      this.setState({
        storeData: currentState,
        recipesComponents: this._fillWithStoredRecipes(this.state.dispatch, this._saveWrapper.bind(this), this.deleteARecipe),
        showModal: false });
      //this.renderRecipes().bind(this)();
      this.state.saveToLocalStorageRecipes(currentState);
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

    //listOfRecipes:this.props.store.getlocalStorageState(),
    //dispatch: this.props.store.dispatchAction,

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