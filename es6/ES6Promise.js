var p = Promise.reject(1)

p.then(
  (val) => {
    console.log(val)
  },
  (rea) => {
    console.error('Error:', rea)
    return rea
  }
).then(console.log)

// var p = Promise.all([
//   Promise.resolve(1),
//   2,
//   new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(3)
//     }, 100)
//   }),
//   Promise.reject(4),
// ])

// p.then(
//   (val) => {
//     console.log(val)
//   },
//   (rea) => {
//     console.error(rea)
//   }
// )

// var p = new Promise((resolve, reject) => {
//   resolve({
//     then: function (resolve, reject) {
//       resolve(1)
//     },
//   })
// })

// p.then(function onFulfilled(value) {
//   console.log(value)
// })

// p.then(
//   (val) => {
//     console.log(val)
//   },
//   (val) => {
//     console.log(val)
//   }
// ).then((val) => {
//   console.log(val)
// })

// setTimeout(() => {
//   p.then((val) => {
//     console.log('Resolve2: ', val)
//   })
// }, 0)

// // Case2 resolve 一个 padding 的 promise
// var p2 = new Promise((resolve, reject) => {
//   resolve(1)
// })

// p2.then((val) => {
//   return new Promise((resolve) => {
//     resolve(val + 1)
//   })
// }).then((val) => {
//   console.log('Case2: ', val)
// })
