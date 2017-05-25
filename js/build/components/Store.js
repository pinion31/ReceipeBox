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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Store = function (_Component) {
  _inherits(Store, _Component);

  //[{name:cookie, ingredients:[milk,eggs]},{},]
  function Store(props) {
    _classCallCheck(this, Store);

    var _this = _possibleConstructorReturn(this, (Store.__proto__ || Object.getPrototypeOf(Store)).call(this, props));
    //constructor(super);


    _this.recipes = [];
    return _this;
  }

  _createClass(Store, [{
    key: 'dispatchAction',
    value: function dispatchAction() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var action = arguments[1];

      return handleAction(state.recipes, action);
    }
  }, {
    key: 'render',
    value: function render() {}
  }, {
    key: 'getlocalStorageState',
    value: function getlocalStorageState() {
      var data = localStorage.getItem('data');

      if (!data) {
        data = [];
      }

      return data;
    }
  }, {
    key: 'handleAction',
    value: function handleAction(state, action) {
      var newState = Array.from(state);

      switch (action.type) {
        case "ADD_RECIPE":
          newState.push({ name: action.name, ingredients: action.ingredients });
          return newState;

        case "SET_INGRED":
          newState.map(function (value) {

            if (value.name === action.name) {
              vaule.ingredients = action.ingredients;
            }
            return value;
          });
          return newState;

        case "DELETE_RECIPE":
          newState = newState.filter(function (v, k) {

            if (value.name != action.name) {
              return value;
            }
          });
          return newState;
        default:
          return state;
      }
    }
  }, {
    key: 'loadFromLocalStorage',
    value: function loadFromLocalStorage() {
      var data = localStorage.getItem('data');

      if (!data) {
        data = [];
      }

      return data;
    }
  }, {
    key: 'saveToLocalStorage',
    value: function saveToLocalStorage(state) {
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

      localStorage.setItem('data', JSON.stringify(state, replacer));
    }
  }]);

  return Store;
}(_react.Component);

exports.default = Store;