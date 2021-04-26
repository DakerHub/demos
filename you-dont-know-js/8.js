function instanceOf(obj, func) {
  var p = obj
  while (p) {
    if (p === func.prototype) {
      return true
    }
    p = p.__proto__
  }

  return false
}

var a = {}
console.log(a instanceof Object)
console.log(instanceOf(a, Object))

var b = Object.create(a)

console.log(a.isPrototypeOf(b))
console.log(isRelated(b, a))

function isRelated(a, b) {
  function Fn() {}
  Fn.prototype = b

  return a instanceof Fn
}
