// ajax
var xhr = new XMLHttpRequest()

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}

xhr.setRequestHeader('key', 'value')

xhr.open(method, url)
xhr.send(data)

// debounce
function debounce(fn, wait) {
  var timer
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, wait)
  }
}

// bind
function bind(fn, context) {
  return function (...args) {
    return fn.apply(context, args)
  }
}

// curry
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      fn.apply(this, args)
    } else {
      return function (...args2) {
        return fn.apply(this, args.concat(args2))
      }
    }
  }
}

// apply
function apply(fn, context, args) {
  const tmp = Symbol()
  context[tmp] = fn
  var res = context[tmp](...args)

  delete context[tmp]

  return res
}
