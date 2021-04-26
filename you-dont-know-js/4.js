var arr = [1, 2]

var it = arr[Symbol.iterator]()

console.log(it.next())
console.log(it.next())
console.log(it.next())

var obj = {}

Object.defineProperty(obj, Symbol.iterator, {
  value: function () {
    var i = 0
    return {
      next: function () {
        return {
          value: i++,
          done: i > 2,
        }
      },
    }
  },
})

for (const val of obj) {
  console.log(val)
}
