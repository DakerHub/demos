// 3.请将以下数组，按照姓名字典顺序排序;  至少写出两种方法
// 排序
// const arr = [{
// name: 'zhangsan',
// age: 12
// }, {
// name: 'xiaoming',
// age: 10,
// class: 'L2'
// },...]

function sort1(arr) {
  arr.sort((a, b) => (b.name < a.name ? 1 : -1))
  return arr
}

function sort2(arr) {
  arr.sort((a, b) => a.name.localeCompare(b.name))
  return arr
}

const arr = [
  {
    name: 'zhangsan',
    age: 12,
  },
  {
    name: 'xiaoming',
    age: 10,
    class: 'L2',
  },
  {
    name: 'ab',
    age: 10,
    class: 'L2',
  },
  {
    name: 'aa',
    age: 10,
    class: 'L2',
  },
]

console.log(sort1(arr))
console.log(sort2(arr))
