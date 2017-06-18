const iterAst = (ast) => {
	switch (ast.type) {
		case 'tagList':
			return `${ast.body.map(iterAst).join('')}`;
		case 'tag':
			const attrsLine = Object.keys(ast.options).reduce((acc, key) =>
				`${acc} ${key}="${ast.options[key]}"`, '')
			return `<${ast.name}${attrsLine}>${iterAst(ast.body)}</${ast.name}>`;
		default:
			return ast;
	}
}

const iter = (data) => {
		if (data[0] instanceof Array) {
			return {type: 'tagList', body: data.map(iter)};
		}

		let body;
		let options;
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

		const processedBody = body instanceof Array ? iter(body) : body;
		const result = {type: 'tag', name: data[0], body: processedBody, options};
		//console.log(result);
		return result;
	};

	const build = (data) => iterAst(iter(data));

	const dt = [
		['meta', [
			['title', 'hello, world!'],
		]],
		['body', [
			['h1', {class: 'header', id: 'demo'}, 'html builder example'],
			['div', [
				['span'],
				['span', 'text2'],
			]]
		]],
	];

	const dat = ['html', [
			['head', [
				['title', 'hello, hexlet!'],
			]],
			['body', { class: 'container' }, [
				['h1', { class: 'header' }, 'html builder example'],
				['div', [
					['span'],
					['span', { class: 'text', id: 'uniq-key' }],
				]],
			]],
		]];
	console.log(build(dat));



// Other variant

const argTypes = {
	body: a => typeof a === 'string',
	children: a => a instanceof Array,
	attrs: a => a instanceof Object,
};

const getArgName = arg =>
Object.keys(argTypes).filter(k => argTypes[k](arg))[0];

const buildAttrString = attrs =>
Object.keys(attrs).map(key => ` ${key}="${attrs[key]}"`).join('');

const buildHtml = tagArr => {
	const tag = tagArr.slice(1)
	.reduce((acc, arg) => ({ ...acc, [getArgName(arg)]: arg }),
		{ name: tagArr[0], attrs: {}, body: '', children: [] });

	return [`<${tag.name}${buildAttrString(tag.attrs)}>`,
	`${tag.body}${tag.children.map(buildHtml).join('')}`,
	`</${tag.name}>`,
	].join('');
};

//export default buildHtml;

console.log(buildHtml(dat));