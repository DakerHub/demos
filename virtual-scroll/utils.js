export function createBigList() {
  const arr = []
  for (let i = 0; i < 100000; i++) {
    arr.push(i)
  }

  return arr
}

export function findIndexOverHeight(list, offset) {
  let currentHeight = 0
  for (let i = 0; i < list.length; i++) {
    const { height } = list[i]
    currentHeight += height

    if (currentHeight > offset) {
      return i
    }
  }

  return list.length - 1
}

export function sumHeight(list, start = 0, end = list.length) {
  let height = 0
  for (let i = start; i < end; i++) {
    height += list[i].height
  }

  return height
}

export function throttle(fn, wait) {
  let timer, lastApply

  return function (...args) {
    const now = Date.now()
    if (!lastApply) {
      fn.apply(this, args)
      lastApply = now
      return
    }

    if (timer) return
    const remain = now - lastApply > wait ? 0 : wait

    timer = setTimeout(() => {
      fn.apply(this, args)
      lastApply = Date.now()
      timer = null
    }, remain)
  }
}
