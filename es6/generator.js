console.log('---------Base--------')
;(() => {
  function* foo() {
    yield 1
    yield 2
    yield 3
    return 4
  }

  var it = foo()
  console.log(typeof it)
  console.log(Object.prototype.toString.call(it))

  console.log(it.next())
  console.log(it.next())
  try {
    console.log(it.throw('?'))
  } catch (error) {
    console.error(error)
  }
  console.log(it.next())
  console.log(it.next())

  // for (const val of it) {} 错！必须使用新的迭代器
  for (const val of foo()) {
    console.log(val)
  }
})()

console.log('---------Step--------')
;(() => {
  function bar(n) {
    return n * 2
  }

  function* step() {
    var s1 = yield 1
    var s2 = yield bar(s1)
    var s3 = yield bar(s2)
    return s3
  }

  var it2 = step()
  var s0 = it2.next().value
  var s1 = it2.next(s0).value
  console.log(s1)
})()

console.log('---------Fib--------')
;(() => {
  function* foo() {
    let n1 = 1,
      n2 = 1
    while (true) {
      const n = n1 + n2
      yield n
      n1 = n2
      n2 = n
    }
  }

  var fib = foo()
  console.log(fib.next().value)
  console.log(fib.next().value)
  console.log(fib.next().value)
  console.log(fib.next().value)
})()

console.log('---------Async--------')
;(() => {
  function asyncFun() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 500)
    }).then(() => it.next())
  }

  function* foo() {
    yield asyncFun()
    console.log(1)
    yield asyncFun()
    console.log(2)
    yield asyncFun()
    console.log(3)
  }

  var it = foo()
  // it.next()
})()

console.log('---------Run--------')
;(() => {
  function asyncFun(prev) {
    console.log('prev:', prev)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(prev + 1)
      }, 500)
    })
  }

  function* foo() {
    var s0 = yield asyncFun(0)
    var s1 = yield asyncFun(s0).then(() => {
      return Promise.reject('abort')
    })
    var s2 = yield asyncFun(s1)
    return s2
  }

  run(foo).then(
    (val) => {
      console.log('Final:', val)
    },
    (rea) => {
      console.log('Error:', rea)
    }
  )

  function run(gen) {
    var it = gen()

    return new Promise((resolve, reject) => {
      onFulfilled()

      function onFulfilled(value) {
        var ret
        try {
          ret = it.next(value)
        } catch (error) {
          reject(error)
        }

        next(ret)
      }

      function onRejected(value) {
        var ret
        try {
          ret = it.throw(value)
        } catch (error) {
          reject(error)
        }

        next(ret)
      }

      function next(ret) {
        if (ret && ret.done) {
          resolve(ret.value)
          return
        }

        ret && ret.value.then(onFulfilled, onRejected)
      }
    })
  }
})()
