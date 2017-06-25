class PairedTag {
	constructor(name, attributes = {}, body = '', children = []) {
		this.name = name;
		this.attributes = attributes;
		this.body = body;
		this.children = children;
	}
	getAttributesAsLine() {
		return Object.keys(this.attributes).reduce((acc, val) => 
			`${acc} ${val}="${this.attributes[val]}"`, '');
	}

	toString() {
		const content = this.children.length > 0 ? 
			this.children.map(el => el.toString()).join('') : this.body;

		return `<${this.name}${this.getAttributesAsLine()}>${content}</${this.name}>`
	}
}

class SingleTag {
	constructor(name, attributes = {}) {
		this.name = name;
		this.attributes = attributes;
	}

	getAttributesAsLine() {
		return Object.keys(this.attributes).reduce((acc, val) => 
			`${acc} ${val}="${this.attributes[val]}"`, '');
	}
	toString() {
		return `<${this.name}${this.getAttributesAsLine()}>`
	}
}

const singleTagList = new Set(['hr', 'br', 'img']);
const buildNode = (name, ...cont) => {
	if (singleTagList.has(name)) {
		return new SingleTag(name, ...cont)
	}
	return new PairedTag(name, ...cont);
}