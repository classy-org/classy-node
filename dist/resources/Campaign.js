"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CalculatorMixin = function CalculatorMixin(Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
    }

    _createClass(_class, [{
      key: "bfn",
      value: function bfn() {
        return this.b;
      }
    }]);

    return _class;
  }(Base);
};

var RandomizerMixin = function RandomizerMixin(Base) {
  return function (_Base2) {
    _inherits(_class2, _Base2);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(_class2).apply(this, arguments));
    }

    _createClass(_class2, [{
      key: "afn",
      value: function afn() {
        return this.a;
      }
    }]);

    return _class2;
  }(Base);
};

var Foo = function Foo(a) {
  _classCallCheck(this, Foo);

  this.a = a;
};

var Bar = function (_CalculatorMixin) {
  _inherits(Bar, _CalculatorMixin);

  function Bar(a, b) {
    _classCallCheck(this, Bar);

    var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(Bar).call(this, a));

    _this3.b = b;
    return _this3;
  }

  return Bar;
}(CalculatorMixin(RandomizerMixin(Foo)));

exports.default = Bar;