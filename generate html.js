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
		return {type: 'tag', name: data[0], body: processedBody, options};
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
