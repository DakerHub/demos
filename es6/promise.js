const defaultOnFulfilled = function (value) {
  return value
}
const defaultOnRejected = function (err) {
  throw err
}

const resolvePromise = function (promise, x, resolve, reject) {
  if (promise === x) {
    throw new Error('循环引用')
  }

  if (x instanceof MyPromise) {
    x.then(resolve, reject)
  } else if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    var then
    // 2.3.3.2 如果捕获（try，catch）到 x.then 抛出的错误的话，需要 reject 这个promise
    try {
      then = x.then
    } catch (error) {
      reject(error)
    }

    if (typeof then === 'function') {
      var hasResolved = false
      try {
        then.call(
          x,
          (val) => {
            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 已经被调用或以相同的参数多次调用的话吗，优先第一次的调用，并且之后的调用全部被忽略（避免多次调用）
            if (hasResolved) return

            hasResolved = true
            resolvePromise(promise, val, resolve, reject)
          },
          (reason) => {
            // 2.3.3.3.3 如果 resolvePromise 和 rejectPromise 已经被调用或以相同的参数多次调用的话吗，优先第一次的调用，并且之后的调用全部被忽略（避免多次调用）
            if (hasResolved) return

            hasResolved = true
            reject(reason)
          }
        )
      } catch (error) {
        // 2.3.3.3.4.1 如果 resolvePromise 或 rejectPromise 已经被调用，那么忽略异常
        if (hasResolved) return

        // 2.3.3.3.4.2 否则，则 reject 这个异常
        hasResolved = true
        reject(error)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

function MyPromise(init) {
  var value = undefined
  var reason = undefined
  var status = 'padding'
  var onFulfilleds = []
  var onRejecteds = []

  this.then = function (onFulfilled, onRejected) {
    // 2.2.1.1 如果 onFulfilled 不是函数，它会被忽略
    var validOnFulfilled = typeof onFulfilled === 'function' ? onFulfilled : defaultOnFulfilled
    // 2.2.1.2 如果 onRejected 不是函数，它会被忽略
    var validOnRejected = typeof onRejected === 'function' ? onRejected : defaultOnRejected

    var nextOnFullfilled = (promise, resolve2, reject2) => {
      try {
        var nextValue = validOnFulfilled(value)
        resolvePromise(promise, nextValue, resolve2, reject2)
      } catch (error) {
        reject2(error)
      }
    }
    var nextOnRejected = (resolve2, reject2) => {
      try {
        var nextValue = validOnRejected(reason)
        resolvePromise(promise, nextValue, resolve2, reject2)
      } catch (error) {
        reject2(error)
      }
    }

    var p = new MyPromise((resolve2, reject2) => {
      if (status === 'padding') {
        onFulfilleds.push(nextOnFullfilled.bind(this, p, resolve2, reject2))
        onRejecteds.push(nextOnRejected.bind(this, p, resolve2, reject2))
      } else if (status === 'fulfilled') {
        process.nextTick(() => {
          nextOnFullfilled(p, resolve2, reject2)
        })
      } else if (status === 'rejected') {
        process.nextTick(() => {
          nextOnRejected(p, resolve2, reject2)
        })
      }
    })

    return p
  }

  var resolve = function (val) {
    if (status !== 'padding') return

    value = val
    status = 'fulfilled'
    process.nextTick(() => {
      onFulfilleds.forEach((fn) => {
        fn()
      })

      // 释放引用
      onFulfilleds.length = 0
      onRejecteds.length = 0
    })
  }

  var reject = function (rea) {
    if (status !== 'padding') return

    reason = rea
    status = 'rejected'
    process.nextTick(() => {
      onRejecteds.forEach((fn) => {
        fn()
      })

      // 释放引用
      onFulfilleds.length = 0
      onRejecteds.length = 0
    })
  }

  init(resolve, reject)
}

MyPromise.resolve = function (value) {
  var p = new MyPromise((resolve, reject) => {
    resolvePromise(p, value, resolve, reject)
  })

  return
}

MyPromise.reject = function (reason) {
  return new MyPromise((resolve, reject) => {
    reject(reason)
  })
}

MyPromise.all = function (promises) {
  if (!Array.isArray(promises)) {
    return MyPromise.resolve([])
  }

  return new MyPromise((resolve, reject) => {
    var count = promises.length,
      values = [],
      _promises = promises.concat()

    for (let i = 0; i < _promises.length; i++) {
      var p = _promises[i]
      if (p instanceof MyPromise) {
        p.then(
          (val) => {
            values[i] = val
            if (--count === 0) {
              _promises.length = 0
              return resolve(values)
            }
          },
          (reason) => {
            _promises.length = 0
            return reject(reason)
          }
        )
      } else {
        values[i] = p
        if (--count === 0) {
          _promises.length = 0
          return resolve(values)
        }
      }
    }
  })
}

// var p = new MyPromise((resolve, reject) => {
//   resolve(1)
// })

// p.then(null, (rea) => {
//   console.log('Reject: ', rea)
// }).then(
//   (val) => {
//     console.log('Resolve2: ', val)
//   },
//   (val) => {
//     console.log('Reject2: ', val)
//   }
// )

// setTimeout(() => {
//   p.then((val) => {
//     console.log('Resolve3: ', val)
//   })
// }, 0)
// console.log(p.toString())

var ps = MyPromise.all([
  MyPromise.resolve(1),
  2,
  new MyPromise((r) => {
    setTimeout(() => {
      r(3)
    }, 1000)
  }),
  MyPromise.reject(4),
])

ps.then(
  (values) => {
    console.log(values)
  },
  (reason) => {
    console.log(reason)
  }
)
