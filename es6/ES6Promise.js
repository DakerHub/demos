var p = new Promise((resolve, reject) => {
  resolve({
    then: function (resolve, reject) {
      resolve(1)
    },
  })
})

p.then(function onFulfilled(value) {
  console.log(value)
})

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
