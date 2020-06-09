import { Dep } from "./dep.js"

export class Observer {
  constructor(value) {
    this.value = value
    this.dep = new Dep()
    const proto = Object.getPrototypeOf(value)
    proto.__ob__ = this

    if (Array.isArray(value)) {
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(value) {
    value.forEach((item) => {
      observe(item)
    })
  }
  walk(value) {
    Object.keys(value).forEach((key) => {
      defineReactive(value, key)
    })
  }
}

function defineReactive(obj, key, val) {
  val = obj[key]
  const dep = new Dep()

  observe(val)
  Object.defineProperty(obj, key, {
    set(newVal) {
      observe(newVal)
      val = newVal
      dep.notify()
    },
    get() {
      if (Dep.target) {
        dep.depend()
      }
      return val
    },
  })
}

export function observe(value) {
  let ob

  if (value.hasOwnProperty("__ob__")) {
    ob = value.__ob__
  } else if (Array.isArray(value) || isPlainObject(value)) {
    ob = new Observer(value)
  }

  return ob
}

function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}
