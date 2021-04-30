const valueKey = Symbol('value')

function Calc(init) {
  this[valueKey] = init
}

Calc.prototype.add = function (num) {
  checkContext(this)

  this[valueKey] += num
  return this
}

Calc.prototype.value = function () {
  checkContext(this)

  return this[valueKey]
}

function checkContext(context) {
  if (!(context instanceof Calc)) {
    throw new TypeError('Calc.prototype.add called on incompatible receiver ', context)
  }
}

var c = new Calc(2)
c.add(3).add(9)

console.log(c.value())
