// function sayName(context) {
//   console.log(`I am ${context.name}`)
// }

// var me = {
//   name: 'Daker',
// }
// sayName(me)

// function sayName() {
//   console.log(`I am ${this.name}`)
// }

// var me = {
//   name: 'Daker',
// }
// sayName.call(me)

function foo(num) {
  console.log(num)
  this.count++
}

foo.count = 0
for (let i = 0; i < 4; i++) {
  foo(i)
}

console.log(foo.count)
console.log(global.count)
