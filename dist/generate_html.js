'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var iterAst = function iterAst(ast) {
	switch (ast.type) {
		case 'tagList':
			return '' + ast.body.map(iterAst).join('');
		case 'tag':
			var attrsLine = Object.keys(ast.options).reduce(function (acc, key) {
				return acc + ' ' + key + '="' + ast.options[key] + '"';
			}, '');
			return '<' + ast.name + attrsLine + '>' + iterAst(ast.body) + '</' + ast.name + '>';
		default:
			return ast;
	}
};

var iter = function iter(data) {
	if (data[0] instanceof Array) {
		return { type: 'tagList', body: data.map(iter) };
	}

	var body = void 0;
	var options = void 0;
	if (data.length === 3) {
		body = data[2];
		options = data[1];
	} else if (data.length === 2 && (data[1] instanceof Array || typeof data[1] === 'string')) {
		body = data[1];
		options = [];
	} else if (data.length === 2 && data[1] instanceof Object) {
		body = '';
		options = data[1];
	} else {
		body = '';
		options = [];
	}

	var processedBody = body instanceof Array ? iter(body) : body;
	var result = { type: 'tag', name: data[0], body: processedBody, options: options };
	//console.log(result);
	return result;
};

var build = function build(data) {
	return iterAst(iter(data));
};

var dt = [['meta', [['title', 'hello, world!']]], ['body', [['h1', { class: 'header', id: 'demo' }, 'html builder example'], ['div', [['span'], ['span', 'text2']]]]]];

var dat = ['html', [['head', [['title', 'hello, hexlet!']]], ['body', { class: 'container' }, [['h1', { class: 'header' }, 'html builder example'], ['div', [['span'], ['span', { class: 'text', id: 'uniq-key' }]]]]]]];
//console.log(build(dat));


// Other variant

var argTypes = {
	body: function body(a) {
		return typeof a === 'string';
	},
	children: function children(a) {
		return a instanceof Array;
	},
	attrs: function attrs(a) {
		return a instanceof Object;
	}
};

var getArgName = function getArgName(arg) {
	return Object.keys(argTypes).filter(function (k) {
		return argTypes[k](arg);
	})[0];
};

var buildAttrString = function buildAttrString(attrs) {
	return Object.keys(attrs).map(function (key) {
		return ' ' + key + '="' + attrs[key] + '"';
	}).join('');
};

var buildHtml = function buildHtml(tagArr) {
	var tag = tagArr.slice(1).reduce(function (acc, arg) {
		return _extends({}, acc, _defineProperty({}, getArgName(arg), arg));
	}, { name: tagArr[0], attrs: {}, body: '', children: [] });

	return ['<' + tag.name + buildAttrString(tag.attrs) + '>', '' + tag.body + tag.children.map(buildHtml).join(''), '</' + tag.name + '>'].join('');
};

//export default buildHtml;

//console.log(iter(dat));


//new 
var render = exports.render = function render(_ref) {
	var name = _ref.name,
	    attributes = _ref.attributes,
	    body = _ref.body,
	    children = _ref.children;

	var attrsLine = Object.keys(attributes).reduce(function (acc, key) {
		return acc + ' ' + key + '="' + attributes[key] + '"';
	}, '');
	var content = children.length > 0 ? children.map(render).join('') : body;

	if (singleTagsList.has(name)) {
		return '<' + name + attrsLine + '>';
	}

	return '<' + name + attrsLine + '>' + content + '</' + name + '>';
};

var propertyActions = [{
	name: 'body',
	check: function check(arg) {
		return typeof arg === 'string';
	},
	process: _.identity
}, {
	name: 'children',
	check: function check(arg) {
		return arg instanceof Array;
	},
	process: function process(children, f) {
		return children.map(f);
	}
}, {
	name: 'attributes',
	check: function check(arg) {
		return arg instanceof Object;
	},
	process: _.identity
}];

var getPropertyAction = function getPropertyAction(arg) {
	return _.find(propertyActions, function (_ref2) {
		var check = _ref2.check;
		return check(arg);
	});
};

var parse = exports.parse = function parse(data) {
	return data.slice(1).reduce(function (acc, arg) {
		var _getPropertyAction = getPropertyAction(arg),
		    name = _getPropertyAction.name,
		    process = _getPropertyAction.process;

		return _extends({}, acc, _defineProperty({}, name, process(arg, parse)));
	}, { name: data[0], attributes: {}, body: '', children: [] });
};