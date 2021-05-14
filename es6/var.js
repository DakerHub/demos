try {
  {
    console.log(a)
    console.log(b)
    var a = 1
    let b = 1
  }

  console.log(a)
  console.log(b)
} catch (error) {
  console.error(error)
}

try {
  {
    // ReferenceError: Cannot access 'c' before initialization
    let c = c
    console.log(c)
  }
} catch (error) {
  console.error(error)
}

function fun() {
  fun = 1
  console.log(fun)
}
fun()
;(function fun() {
  fun = 1
  console.log(fun)
})()

var n = 3,
  m = 4

;[m, n] = [n, m]
console.log(m, n)
