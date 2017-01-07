var tap = require('agraddy.test.tap')(__filename);
var util = require('util');

var expected;

var base = [
{first_name: 'John', last_name: 'Smith', age: 60},
{first_name: 'John', last_name: 'Smith', age: 50},
{first_name: 'Jane', last_name: 'Smith', age: 55},
{first_name: 'Jane', last_name: 'Doe', age: 35}
];

var mod = require('../');

base.sort(mod('age'));
expected = [
{first_name: 'Jane', last_name: 'Doe', age: 35},
{first_name: 'John', last_name: 'Smith', age: 50},
{first_name: 'Jane', last_name: 'Smith', age: 55},
{first_name: 'John', last_name: 'Smith', age: 60}
];
tap.assert.deepEqual(base, expected, 'Should ascend by age.');


base.sort(mod('age', 'desc'));
expected = [
{first_name: 'John', last_name: 'Smith', age: 60},
{first_name: 'Jane', last_name: 'Smith', age: 55},
{first_name: 'John', last_name: 'Smith', age: 50},
{first_name: 'Jane', last_name: 'Doe', age: 35}
];
tap.assert.deepEqual(base, expected, 'Should descend by age.');

base.sort(mod(['first_name', 'age'], 'desc'));
expected = [
{first_name: 'John', last_name: 'Smith', age: 60},
{first_name: 'John', last_name: 'Smith', age: 50},
{first_name: 'Jane', last_name: 'Smith', age: 55},
{first_name: 'Jane', last_name: 'Doe', age: 35}
];
tap.assert.deepEqual(base, expected, 'Should descend by first_name and age.');

base.sort(mod(['first_name', 'age'], ['asc', 'desc']));
expected = [
{first_name: 'Jane', last_name: 'Smith', age: 55},
{first_name: 'Jane', last_name: 'Doe', age: 35},
{first_name: 'John', last_name: 'Smith', age: 60},
{first_name: 'John', last_name: 'Smith', age: 50}
];
tap.assert.deepEqual(base, expected, 'Should ascend by first_name and descend by age.');

// Throw an error if mismatched
try {
base.sort(mod(['first_name'], ['asc', 'desc']));
} catch(e) {
tap.assert(true, 'Should throw an error if the directions array is longer than the keys array.');
}
