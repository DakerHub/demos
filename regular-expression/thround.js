var n = 1234567890.1234567

console.log(n.toLocaleString())
var exp = /(?<!\.\d*)(\d{1,3})(?=(\d{3})+\b)/g

console.log(n.toString().match(exp))
var nt = n.toString().replace(exp, '$&,')
console.log(nt)
