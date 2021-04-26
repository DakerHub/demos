// 请将数组[1, 2,1,...] 进行去重，不少于两种方法。

function unique1(arr) {
  return Array.from(new Set(arr))
}

function unique2(arr) {
  return arr.reduce((prev, cur) => (prev.includes(cur) ? prev : [...prev, cur]), [])
}

console.log(unique2([1, 2, 2, 3, 1]))
console.log(unique2([1, 2, 3, 1]))
