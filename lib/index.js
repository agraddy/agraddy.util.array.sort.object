var mod = function(keys, directions) {
	var direction;
	var index = 0;
	var i;
	if(!Array.isArray(keys)) {
		keys = [keys];
	}

	if(typeof directions == 'undefined') {
		directions = ['asc'];
	} else if(!Array.isArray(directions)) {
		directions = [directions];
	}

	if(keys.length != directions.length && directions.length == 1 && directions.length < keys.length) {
		direction = directions[0];
		directions = [];
		for(i = 0; i < keys.length; i++) {
			directions.push(direction);
		}
	} else if(keys.length != directions.length) {
		throw new Error('The keys and directions arrays need to be the same length.');
	}

	function sort(keys, directions, index, a, b) {
		if(directions[index] == 'desc') {
			if(a[keys[index]] < b[keys[index]]) {
				return 1;
			} else if(a[keys[index]] > b[keys[index]]) {
				return -1;
			} else {
				sort(keys, directions, index + 1, a, b);
				return 0;
			}
		} else {
			if(a[keys[index]] > b[keys[index]]) {
				return 1;
			} else if(a[keys[index]] < b[keys[index]]) {
				return -1;
			} else {
				sort(keys, directions, index + 1, a, b);
				return 0;
			}
		}
	}

	return sort.bind(null, keys, directions, index);
};

module.exports = mod;
