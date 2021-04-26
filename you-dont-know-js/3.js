var obj = {
  a: 1,
  b: 2,
}

Object.defineProperty(obj, 'a', {
  enumerable: false,
})

console.log(Object.keys(obj))
console.log(Object.values(obj))
console.log(Object.entries(obj))

console.log(Object.getOwnPropertyNames(obj))

for (const index in [1, 2, 3]) {
  console.log(index)
}
