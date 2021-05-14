var o = {
  a: 1,
  foo: function () {
    return this.a
  },
}

var p = {
  a: 2,
}

a = 0

console.log((p.foo = o.foo)())
