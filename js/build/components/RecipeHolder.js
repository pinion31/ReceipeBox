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
      listOfRecipes: []

    };
    return _this;
  }

  _createClass(RecipeHolder, [{
    key: '_addRecipe',
    value: function _addRecipe(e) {
      console.log("test");
      e.preventDefault();
      var newListOfRecipes = Array.from(this.state.listOfRecipes);

      newListOfRecipes.push(_react2.default.createElement(
        _Recipe2.default,
        { name: "test", key: newListOfRecipes.length + 1 },
        ' '
      ));

      //sets new state after adding recipe
      this.setState({
        listOfRecipes: newListOfRecipes
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'recipeholder' },
        this.state.listOfRecipes.map(function (recipeIndex) {
          return recipeIndex;
        }),
        _react2.default.createElement(
          'form',
          null,
          _react2.default.createElement(
            'button',
            { id: 'addRecipe', type: 'submit', onClick: this._addRecipe.bind(this) },
            'Add Recipe'
          )
        )
      );
    }
  }]);

  return RecipeHolder;
}(_react.Component);

exports.default = RecipeHolder;