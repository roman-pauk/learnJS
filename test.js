const arr = [1, 2, 5, 2, 3, 5, 1, 7, 3];

const findOdd = (array) => {
	const iter = (arr, index) => {
		if (index === arr.length) {
			return NaN;
		}
		const counter = arr.reduce((acum, el) => el === arr[index] ? acum + 1 : acum, 0);
		if (counter % 2 !== 0) {
			return arr[index];
		}
		return iter(arr, index + 1);
	};
	return iter(array, 0);
}

const findOddTc = (arr) => arr.reduce((acc, num) => acc ^ num, 0);


//console.log(findOddTc(arr));

const mp = ['fred', 30, 'barney', 40];
const obj = {};
obj[mp[0]] = mp[1];
obj[mp[2]] = mp[3];
console.log(obj)