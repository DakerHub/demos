function foo() {}

console.log(foo.prototype)
console.log(Object.getOwnPropertyNames(foo.prototype))
console.log(foo.prototype.__proto__ === Object.prototype)

var a = {}
console.log(a.__proto__ === Object.prototype)

function bar() {}

var barProto = {}
Object.defineProperty(barProto, 'constructor', {
  value: bar,
  writable: true,
  enumerable: false,
  configurable: true,
})

bar.prototype = barProto

console.log(bar.prototype)
console.log(Object.getOwnPropertyNames(bar.prototype))
console.log(bar.prototype.__proto__ === Object.prototype)
