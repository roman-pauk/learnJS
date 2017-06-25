"use strict";

var magic = function magic(ar) {
	return ar;
};
magic.valueof = function () {
	return 3;
};
console.log(magic(2) + 4);