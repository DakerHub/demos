let uid = 0

export class Dep {
  static target
  constructor() {
    this.id = uid++
    this.subs = []
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  notify() {
    for (let i = 0; i < this.subs.length; i++) {
      const sub = this.subs[i]

      sub.update()
    }
  }
}

Dep.target = null
const targetStack = []

export function pushTarget(target) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget() {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
