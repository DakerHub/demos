function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }

    return function (...args2) {
      return curried.apply(this, args.concat(args2))
    }
  }
}

function sum(a, b, c) {
  return a + b + c
}

var s = curry(sum)

function test(...args) {}

console.log(test.length)
console.log(sum.length)
console.log(s(1)(2)(3))
