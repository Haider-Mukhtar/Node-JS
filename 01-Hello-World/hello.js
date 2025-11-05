console.log("Hello To NODE JS.");
// node hello.js
// node hello

////////////////////////////////////////////////

// console.log(alert("Hello!!!"));
// Throw an error "alert is not defined"
// Window Objects are not availabel here in node.js

////////////////////////////////////////////////

// npm init
// It will generate the package.json file
// It is the configutation file

// "scripts": {
// //   "start": "node hello.js"
// },

////////////////////////////////////////////////

const math = require("./math.js");

console.log("Add 2 + 5 =", math.add(2, 5));
console.log("Sub 2 - 5 =", math.sub(2, 5));
console.log("Mul 2 * 5 =", math.mul(2, 5));
console.log("Div 2 / 5 =", math.div(2, 5));

const { add, sub, mul, div } = require("./math.js");

console.log("Add 2 + 5 =", add(2, 5));
console.log("Sub 2 - 5 =", sub(2, 5));
console.log("Mul 2 * 5 =", mul(2, 5));
console.log("Div 2 / 5 =", div(2, 5));

