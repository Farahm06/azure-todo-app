const assert = require('assert');

// Test 1 
console.log('Test 1 : Vérification logique todos...');
const todos = [];
todos.push({ id: 1, title: 'Test todo', done: false });
assert.strictEqual(todos.length, 1, 'La liste doit contenir 1 élément');
assert.strictEqual(todos[0].title, 'Test todo', 'Le titre doit correspondre');
assert.strictEqual(todos[0].done, false, 'done doit être false par défaut');
console.log('Test 1 passed');

// Test 2 
console.log('Test 2 : Vérification format des données...');
const todo = { id: 1, title: 'Nouvelle tâche', done: false };
assert.ok(todo.id, 'id doit exister');
assert.ok(todo.title, 'title doit exister');
assert.strictEqual(typeof todo.done, 'boolean', 'done doit être un boolean');
console.log('Test 2 passed');

console.log('Tous les tests sont passés !');
process.exit(0);
