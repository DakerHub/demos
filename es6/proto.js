function Bar() {
  this.a = 2
}

Bar.prototype.a = 1

var bar = new Bar()

console.log(bar.a)
