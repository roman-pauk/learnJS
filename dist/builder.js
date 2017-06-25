'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PairedTag = function () {
	function PairedTag(name) {
		var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
		var children = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

		_classCallCheck(this, PairedTag);

		this.name = name;
		this.attributes = attributes;
		this.body = body;
		this.children = children;
	}

	_createClass(PairedTag, [{
		key: 'getAttributesAsLine',
		value: function getAttributesAsLine() {
			var _this = this;

			return Object.keys(this.attributes).reduce(function (acc, val) {
				return acc + ' ' + val + '="' + _this.attributes[val] + '"';
			}, '');
		}
	}, {
		key: 'toString',
		value: function toString() {
			var content = this.children.length > 0 ? this.children.map(function (el) {
				return el.toString();
			}).join('') : this.body;

			return '<' + this.name + this.getAttributesAsLine() + '>' + content + '</' + this.name + '>';
		}
	}]);

	return PairedTag;
}();

var SingleTag = function () {
	function SingleTag(name) {
		var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, SingleTag);

		this.name = name;
		this.attributes = attributes;
	}

	_createClass(SingleTag, [{
		key: 'getAttributesAsLine',
		value: function getAttributesAsLine() {
			var _this2 = this;

			return Object.keys(this.attributes).reduce(function (acc, val) {
				return acc + ' ' + val + '="' + _this2.attributes[val] + '"';
			}, '');
		}
	}, {
		key: 'toString',
		value: function toString() {
			return '<' + this.name + this.getAttributesAsLine() + '>';
		}
	}]);

	return SingleTag;
}();

var singleTagList = new Set(['hr', 'br', 'img']);
var buildNode = function buildNode(name) {
	for (var _len = arguments.length, cont = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		cont[_key - 1] = arguments[_key];
	}

	if (singleTagList.has(name)) {
		return new (Function.prototype.bind.apply(SingleTag, [null].concat([name], cont)))();
	}
	return new (Function.prototype.bind.apply(PairedTag, [null].concat([name], cont)))();
};