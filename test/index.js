var tap = require('agraddy.test.tap')(__filename);
var util = require('util');

var expected;

var base = [
{first_name: 'John', last_name: 'Smith', age: 60},
{first_name: 'John', last_name: 'Smith', age: 50},
{first_name: 'Jane', last_name: 'Smith', age: 55},
{first_name: 'Jane', last_name: 'Doe', age: 35}
];

var duplicates = [ 
{ priority: 5 },
{ priority: 20 },
{ priority: 5 },
{ priority: 10 },
{ priority: 10 },
{ priority: 1 }
];

var cities = [ 
{ city: 'Houston', state: 'Texas', code: 281},
{ city: 'Dallas', state: 'Texas', code: 972 },
{ city: 'Dallas', state: 'Texas', code: 214 },
{ city: 'Nashville', state: 'Tennessee', code: 615 },
{ city: 'San Antonio', state: 'Texas', code: 210 },
{ city: 'Chicago', state: 'Illinois', code: 773 },
{ city: 'Los Angeles', state: 'California', code: 323 },
{ city: 'San Francisco', state: 'California', code: 415 },
{ city: 'Sacramento', state: 'California', code: 916 },
{ city: 'New York', state: 'New York', code: 212 },
{ city: 'Philadelphia', state: 'Pennsylvania', code: 215 }
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

duplicates.sort(mod('priority'));
expected = [
{ priority: 1 },
{ priority: 5 },
{ priority: 5 },
{ priority: 10 },
{ priority: 10 },
{ priority: 20 }
];
tap.assert.deepEqual(duplicates, expected, 'Should ascend by priority.');

cities.sort(mod(['state', 'city', 'code']));
expected = [ 
{ city: 'Los Angeles', state: 'California', code: 323 },
{ city: 'Sacramento', state: 'California', code: 916 },
{ city: 'San Francisco', state: 'California', code: 415 },
{ city: 'Chicago', state: 'Illinois', code: 773 },
{ city: 'New York', state: 'New York', code: 212 },
{ city: 'Philadelphia', state: 'Pennsylvania', code: 215 },
{ city: 'Nashville', state: 'Tennessee', code: 615 },
{ city: 'Dallas', state: 'Texas', code: 214 },
{ city: 'Dallas', state: 'Texas', code: 972 },
{ city: 'Houston', state: 'Texas', code: 281},
{ city: 'San Antonio', state: 'Texas', code: 210 }
];
tap.assert.deepEqual(cities, expected, 'Should ascend by priority.');

// Throw an error if mismatched
try {
base.sort(mod(['first_name'], ['asc', 'desc']));
} catch(e) {
tap.assert(true, 'Should throw an error if the directions array is longer than the keys array.');
}
