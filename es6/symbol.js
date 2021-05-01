var a = Symbol('A')
var obj = {}

Object.defineProperty(obj, a, {
  value: 1,
  enumerable: false,
})

console.log(obj)
console.log(obj[a])

console.log(Object.getOwnPropertySymbols(obj))
console.log(obj[Object.getOwnPropertySymbols(obj)[0]])
