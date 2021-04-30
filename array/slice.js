// var slice = Array.prototype.slice
var slice = Function.prototype.call.bind(Array.prototype.slice)

console.log(slice({ 0: 0, length: 1 }))
