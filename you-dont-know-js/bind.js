// 硬绑定
function bind(fn, context, ...args) {
  return function (...args2) {
    return fn.apply(context, args.concat(args2))
  }
}

var obj = { a: 'A' }
var obj2 = { a: 'B' }

function sayA() {
  console.log(this.a)
}

var sayA1 = bind(sayA, obj)
var sayB = bind(sayA, obj2)

sayA1() // A
sayB() // B

var sayA2 = bind(sayB, obj)
sayA2() // B
