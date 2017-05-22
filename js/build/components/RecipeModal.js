'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecipeModal = function (_Component) {
  _inherits(RecipeModal, _Component);

  function RecipeModal(props) {
    _classCallCheck(this, RecipeModal);

    var _this = _possibleConstructorReturn(this, (RecipeModal.__proto__ || Object.getPrototypeOf(RecipeModal)).call(this, props));

    _this.state = {
      show: false,
      onHideFunct: null,
      newRecipe: true
    };
    return _this;
  }

  _createClass(RecipeModal, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactBootstrap.Modal,
        { show: this.state.show, onHide: this.state.onHideFunct },
        _react2.default.createElement(
          _reactBootstrap.Modal.Header,
          { closeButton: true },
          _react2.default.createElement(
            _reactBootstrap.Modal.Title,
            null,
            this.state.newRecipe ? "Add A Recipe" : "Edit Recipe"
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
          _react2.default.createElement('input', { type: 'text', placeholder: 'Recipe Name', id: 'name-of-recipe' }),
          _react2.default.createElement(
            'p',
            { className: 'modal-text' },
            'Ingredients'
          ),
          _react2.default.createElement('textarea', { placeholder: 'Enter ingredients separate by comma', id: 'ingredient-text' })
        ),
        _react2.default.createElement(
          _reactBootstrap.Modal.Footer,
          null,
          _react2.default.createElement(
            _reactBootstrap.Button,
            { id: 'EditRecipe' },
            this.state.newRecipe ? "Add Recipe" : "Edit Recipe"
          ),
          _react2.default.createElement(
            _reactBootstrap.Button,
            { id: 'CloseRecipeModal', onClick: this.state.onHideFunct },
            'Close'
          )
        )
      );
    }
  }]);

  return RecipeModal;
}(_react.Component);

exports.default = RecipeModal;