'use strict';

var arr = [1, 2, 5, 2, 3, 5, 1, 7, 3];

var findOdd = function findOdd(array) {
	var iter = function iter(arr, index) {
		if (index === arr.length) {
			return NaN;
		}
		var counter = arr.reduce(function (acum, el) {
			return el === arr[index] ? acum + 1 : acum;
		}, 0);
		if (counter % 2 !== 0) {
			return arr[index];
		}
		return iter(arr, index + 1);
	};
	return iter(array, 0);
};

var findOddTc = function findOddTc(arr) {
	return arr.reduce(function (acc, num) {
		return acc ^ num;
	}, 0);
};

//console.log(findOddTc(arr));

var mp = ['fred', 30, 'barney', 40];
var obj = {};
obj[mp[0]] = mp[1];
obj[mp[2]] = mp[3];
console.log(obj);