console.log('---------Base---------')
;(() => {
  var raw = {}

  var p = new Proxy(raw, {
    get(target, key, receiver) {
      console.log('访问了属性！')
      return Reflect.get(target, key, receiver)
    },
    set(target, key, val, thisBinding) {
      console.log('设置了属性！')
      return Reflect.set(target, key, val, thisBinding)
    },
  })

  p.a = 1

  console.log(p)
  console.log(raw)
  console.log(p === raw)
})()

console.log('---------Get---------')
;(() => {
  var arr = [1, 2, 3]
  var p = new Proxy(arr, {
    get(target, index, thisBinding) {
      var realIndex = index
      if (Number(index) < 0) {
        realIndex = target.length + Number(index)
      }

      return Reflect.get(target, realIndex, thisBinding)
    },
  })

  console.log(p[1])
  console.log(p[-1])
})()

console.log('---------Apply---------')
;(() => {
  var originalLog = console.log
  console.log = new Proxy(console.log, {
    apply: function (target, ctx, args) {
      Reflect.apply(target, ctx, ['==DEBUG=='])
      return Reflect.apply(target, ctx, args)
    },
  })

  console.log('Daker')
})()
