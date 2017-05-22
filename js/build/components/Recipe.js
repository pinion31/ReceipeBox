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
      showModal: false

    };
    return _this;
  }

  _createClass(Recipe, [{
    key: 'addIngredient',
    value: function addIngredient(nameOfIngredient) {
      var newIngredientList = Array.from(this.state.listOfIngredients);
      newIngredientList.push(_react2.default.createElement(
        'p',
        { id: 'ingredient', key: newIngredientList.length + 1 },
        "replace with name"
      ));

      this.setState({
        listOfIngredients: newIngredientList
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this.setState({
        showModal: false
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
            _react2.default.createElement('input', { type: 'text', placeholder: 'Recipe Name', id: 'name-of-recipe', value: this.state.recipeName }),
            _react2.default.createElement(
              'p',
              { className: 'modal-text' },
              'Ingredients'
            ),
            _react2.default.createElement('textarea', { placeholder: 'Enter ingredients separate by comma', id: 'ingredient-text', value: this.state.listOfIngredients })
          ),
          _react2.default.createElement(
            _reactBootstrap.Modal.Footer,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { id: 'EditRecipe' },
              'Edit Recipe'
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { id: 'CloseRecipeModal', onClick: this.close.bind(this) },
              'Close'
            )
          )
        )
      );
    }
  }]);

  return Recipe;
}(_react.Component);

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


exports.default = Recipe;