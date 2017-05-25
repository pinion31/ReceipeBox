'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _reactBootstrap = require('react-bootstrap');

var _RecipeModal = require('./RecipeModal');

var _RecipeModal2 = _interopRequireDefault(_RecipeModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import Bootstrap from 'bootstrap';

//import Bootstrap from 'bootstrap';


var Recipe = function (_Component) {
  _inherits(Recipe, _Component);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

    _this.state = {
      recipeName: _this.props.name,
      listOfIngredients: _this.props.ingredList,
      showModal: false,
      newRecipeName: _this.props.name,
      newListOfIngredients: _this.props.ingredList,
      dispatch: _this.props.dispatcher
    };
    return _this;
  }

  _createClass(Recipe, [{
    key: 'close',
    value: function close() {
      this.setState({
        showModal: false,
        newRecipeName: this.state.recipeName,
        newListOfIngredients: this.state.listOfIngredients
      });
    }
  }, {
    key: 'open',
    value: function open() {
      this.setState({
        showModal: true
      });
    }
  }, {
    key: '_updateRecipeName',
    value: function _updateRecipeName(evt) {
      this.setState({
        newRecipeName: evt.target.value
      });
    }
  }, {
    key: '_updateIngredList',
    value: function _updateIngredList(evt) {
      var newIngredList = evt.target.value.split(',');

      this.setState({
        newListOfIngredients: newIngredList

      });

      // this.state.updateThisRecipe();
    }
  }, {
    key: '_submitNewRecipeInfo',
    value: function _submitNewRecipeInfo() {

      //remove empty ingredients
      var newIngredList = this.state.newListOfIngredients.filter(function (value) {
        if (value.length > 0) {
          return value;
        }
      });

      this.setState({
        recipeName: this.state.newRecipeName,
        listOfIngredients: newIngredList,
        showModal: false
      });
    }

    /*
    _deleteThisRecipe() {
      this.state.deleteThisRecipe(this.state.indexOfThisRecipe);
    }*/

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactBootstrap.Button,
          { id: 'recipe', onClick: function onClick() {
              return _this2.setState({ open: !_this2.state.open });
            } },
          _react2.default.createElement(
            'h1',
            null,
            this.state.recipeName
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Collapse,
          { 'in': this.state.open, id: 'recipe-content' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _reactBootstrap.Well,
              { id: 'ingredient-space' },
              _react2.default.createElement(
                'h1',
                { id: 'ingredient-heading' },
                'Ingredients'
              ),
              this.state.listOfIngredients.map(function (ingredient, keyId) {
                return _react2.default.createElement(
                  'p',
                  { id: 'ingredient', key: keyId },
                  ingredient
                );
              }),
              _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { id: 'delete' },
                  'Delete Recipe'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { id: 'edit', onClick: this.open.bind(this) },
                  'Edit'
                )
              )
            )
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
              'Edit Recipe'
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
            _react2.default.createElement('input', { type: 'text', placeholder: 'Recipe Name', onChange: this._updateRecipeName.bind(this), id: 'name-of-recipe', value: this.state.newRecipeName }),
            _react2.default.createElement(
              'p',
              { className: 'modal-text' },
              'Ingredients'
            ),
            _react2.default.createElement('textarea', { placeholder: 'Enter ingredients separate by comma', onChange: this._updateIngredList.bind(this), id: 'ingredient-text', value: this.state.newListOfIngredients })
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { id: 'EditRecipe', className: 'btn btn-primary', onClick: this._submitNewRecipeInfo.bind(this) },
              'Edit Recipe'
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

  return Recipe;
}(_react.Component);

exports.default = Recipe;