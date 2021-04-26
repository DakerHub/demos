function foo() {}

var f = new foo()

console.log(f.constructor)
console.log(f.__proto__ === foo.prototype)
console.log(foo.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.prototype)
console.log(Function.__proto__ === Function.prototype)
console.log(Object.prototype.constructor)
console.log(Object.constructor)

var a = {}
console.log(a.constructor)

console.log(typeof a)
console.log(typeof Object)
console.log(typeof Function)

function Person(name) {
  this.name = name
  console.log(this instanceof Person)
  return null
}
let p = new Person('Tom')
Person('tom')
