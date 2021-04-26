function Animal(kind) {
  this.kind = kind
}
Animal.prototype.tellKind = function () {
  return this.kind
}

function Cat(name) {
  Animal.call(this, 'cat')

  this.name = name
}

// Cat.prototype = Object.create(Animal.prototype)
Object.setPrototypeOf(Cat.prototype, Animal.prototype)

Cat.prototype.tellName = function () {
  return `My name is ${this.name}, I'm a ${this.tellKind()}.`
}

var cat = new Cat('mimi')
console.log(cat.tellName())
