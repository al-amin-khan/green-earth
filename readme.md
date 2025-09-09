# ES6 Concepts – Quick Reference

This README provides short, clear answers to some important ES6 concepts.

---

## 1) Difference between `var`, `let`, and `const`

- **`var`**: Function-scoped, hoisted (initialized as `undefined`), can be re-declared & reassigned.
- **`let`**: Block-scoped, hoisted (in Temporal Dead Zone), cannot be re-declared in the same scope, but can be reassigned.
- **`const`**: Block-scoped, must be initialized, cannot be reassigned (though object/array values can still mutate).

```js
var a = 1;   // function scope
let b = 2;   // block scope
const c = 3; // block scope, cannot reassign
```

---

## 2) Difference between `map()`, `forEach()`, and `filter()`

- **`map()`** → Transforms each item and returns a **new array** of the same length.
- **`forEach()`** → Iterates over items, executes a function, **returns nothing**.
- **`filter()`** → Keeps only items that pass a condition, returns a **new array** (may be shorter).

```js
[1, 2, 3].map(n => n * 2);      // [2, 4, 6]
[1, 2, 3].forEach(n => console.log(n)); // prints numbers
[1, 2, 3].filter(n => n > 1);   // [2, 3]
```

---

## 3) Arrow Functions in ES6

Arrow functions are a shorter syntax for writing functions.They:

- Do **not** have their own `this` (use lexical `this` instead).
- Cannot be used as constructors.
- Do not have `arguments` object.

```js
const add = (x, y) => x + y;
```

---

## 4) Destructuring Assignment in ES6

Destructuring allows unpacking values from arrays or objects into variables easily.

```js
// Array destructuring
const [x, y = 10] = [5];    // x = 5, y = 10 (default)

// Object destructuring
const { name, age: years } = { name: "Ali", age: 30 };
// name = "Ali", years = 30
```

---

## 5) Template Literals in ES6

- Use backticks `` ` `` instead of quotes.
- Allow **string interpolation** with `${}`.
- Support **multiline strings** without `\n`.

```js
const user = "Al Amin";
const msg1 = "Hello, " + user + "!";  // concatenation
const msg2 = `Hello, ${user}!`;       // template literal
```

**Difference from string concatenation:**
Cleaner, more readable, supports variables & expressions directly, and handles multiline easily.

---
