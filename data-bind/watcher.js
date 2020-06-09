import { pushTarget, popTarget } from "./dep.js"

let uid = 0

export class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm
    this.exp = expOrFn
    this.cb = cb
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.id = uid++

    this.getter = parsePath(expOrFn)

    this.value = this.get()
  }

  get() {
    const vm = this.vm
    pushTarget(this)

    const value = this.getter.call(vm, vm)

    popTarget()
    this.cleanupDeps()

    return value
  }

  update() {
    this.run()
  }

  run() {
    const value = this.get()
    if (value !== this.value || isObject(value)) {
      // set new value
      const oldValue = this.value
      this.value = value

      this.cb.call(this.vm, value, oldValue)
    }
  }

  addDep(dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) {
      this.newDepIds.add(id)
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) {
        dep.addSub(this)
      }
    }
  }

  cleanupDeps() {
    let i = this.deps.length
    while (i--) {
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this)
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds
    this.newDepIds = tmp
    this.newDepIds.clear()
    tmp = this.deps
    this.deps = this.newDeps
    this.newDeps = tmp
    this.newDeps.length = 0
  }
}

/* 工具函数 */
export const unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/

const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
function parsePath(path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split(".")
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}

function isObject(obj) {
  return obj !== null && typeof obj === "object"
}
