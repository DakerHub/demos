var m = new Map()
m.set('a', 1)
m.set('b', 1)

// ES10
var obj = Object.fromEntries(m)
console.log(obj)

// 存在性
var obj = Object.create({ b: 1 })
obj[Symbol('c')] = 1
Object.defineProperty(obj, 'a', {
  value: 1,
  enumerable: false,
})

console.log(obj)

console.log("'a' in obj: ", 'a' in obj) // true
console.log("obj.hasOwnProperty('a'): ", obj.hasOwnProperty('a')) // true

console.log("'b' in obj: ", 'b' in obj) // true
console.log("obj.hasOwnProperty('b'): ", obj.hasOwnProperty('b')) // false

// 枚举性
console.log(obj)
console.log(Object.keys(obj))
console.log(Object.values(obj))
console.log(Object.entries(obj))

// 不包含Symbol
console.log(Object.getOwnPropertyNames(obj))
