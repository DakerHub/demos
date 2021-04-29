function apply(fn, context = window, args = []) {
  context.fn = fn
  var res = context.fn(...args)

  delete context.fn
  return res
}

var obj = { a: 1 }

function sayA() {
  console.log(this.a)
}

apply(sayA, obj)
