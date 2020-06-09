export default class VirtualScroll {
  constructor($list, list, itemGenerator, options = {}) {
    this.$list = $list
    this.list = list
    this.itemGenerator = itemGenerator
    this._offset = options.initalOffset || 0
    this.cacheCount = options.cacheCount || 5
    this.renderListWithCache = []
    this.offsetToEdge = 0

    this.initItem(list)
    this.initContainer($list)
    this.initScroll($list)
    this.bindEvent()

    this.offset = this._offset
  }

  get offset() {
    return this._offset
  }
  set offset(val) {
    this.render(val)
    return (this._offset = val)
  }

  initItem(list) {
    this._list = list.map((item, i) => ({
      height: 40,
      index: i,
      raw: item,
    }))
  }

  initContainer($list) {
    this.containerHeight = $list.clientHeight
    this.contentHeight = sumHeight(this._list)
    $list.style.overflow = "hidden"
    // $list.style.overflow = "visible"
  }

  initScroll($list) {
    const $scrollTrack = document.createElement("div")
    const $scrollBar = document.createElement("div")
    $scrollTrack.classList.add("vs__scroll")
    $scrollBar.classList.add("vs__scrollbar")

    $scrollTrack.appendChild($scrollBar)
    $list.appendChild($scrollTrack)
    this.$scrollTrack = $scrollTrack
    this.$scrollBar = $scrollBar
  }

  bindEvent() {
    let y = 0
    const contentSpace = this.contentHeight - this.containerHeight
    const noThrolttle = (e) => {
      e.preventDefault()
      y += e.deltaY
      y = Math.max(y, 0)
      y = Math.min(y, contentSpace)
    }
    const updateOffset = (e) => {
      if (y !== this.offset) {
        this.offset = y
      }
    }

    let lastPostion = 0
    const recordPostion = (e) => {
      const offset = extractPx(this.$scrollBar.style.transform)
      lastPostion = offset

      const noThrolttle = (e) => {
        const scrollSpace = this.$scrollTrack.clientHeight - this.$scrollBar.clientHeight
        lastPostion += e.movementY
        lastPostion = Math.max(lastPostion, 0)
        lastPostion = Math.min(lastPostion, scrollSpace)
      }
      const updatePostion = (e) => {
        const scrollSpace = this.$scrollTrack.clientHeight - this.$scrollBar.clientHeight
        const contentSpace = this.contentHeight - this.containerHeight
        const rate = lastPostion / scrollSpace

        const contentOffset = contentSpace * rate
        y = contentOffset

        this.offset = contentOffset
        this.$scrollBar.style.transform = `translateY(${lastPostion}px)`
      }
      const _updatePosition = throttle(updatePostion, 30)
      const removeEvent = () => {
        document.removeEventListener("mousemove", _updatePosition)
        document.removeEventListener("mousemove", noThrolttle)
        document.removeEventListener("mouseup", removeEvent)
      }

      document.addEventListener("mousemove", noThrolttle)
      document.addEventListener("mousemove", _updatePosition)
      document.addEventListener("mouseup", removeEvent)
    }

    const _updateOffset = throttle(updateOffset, 30)

    this.$list.addEventListener("mousewheel", noThrolttle)
    // this.$list.addEventListener("mousewheel", updateOffset)
    this.$list.addEventListener("mousewheel", _updateOffset)

    this.$scrollBar.addEventListener("mousedown", recordPostion)

    this.unbindEvent = function () {
      // this.$list.removeEventListener("mousewheel", updateOffset)
      this.$scrollBar.removeEventListener("mousedown", recordPostion)
      this.$list.removeEventListener("mousewheel", _updateOffset)
      this.$list.removeEventListener("mousewheel", noThrolttle)
    }
  }

  render(offset) {
    updateScrollBar(this.$scrollBar, offset, this.contentHeight, this.containerHeight, this.navigating)

    const headIndex = findOffsetIndex(this._list, offset)
    const tailIndex = findOffsetIndex(this._list, offset + this.containerHeight)

    if (withinCache(headIndex, tailIndex, this.renderListWithCache)) {
      // 改变translateY
      const headIndexWithCache = this.renderListWithCache[0].index
      const offsetToEdge = offset - sumHeight(this._list, 0, headIndexWithCache)
      this.$listInner.style.transform = `translateY(-${offsetToEdge}px)`
      return
    }
    console.log("重新渲染")

    const headIndexWithCache = Math.max(headIndex - this.cacheCount, 0)
    const tailIndexWithCache = Math.min(tailIndex + this.cacheCount, this._list.length)

    this.renderListWithCache = this._list.slice(headIndexWithCache, tailIndexWithCache)
    this.offsetToEdge = offset - sumHeight(this._list, 0, headIndexWithCache)

    if (!this.$listInner) {
      const $listInner = document.createElement("div")
      $listInner.classList.add("vs__inner")
      this.$list.appendChild($listInner)
      this.$listInner = $listInner
    }

    const fragment = document.createDocumentFragment()

    for (let i = 0; i < this.renderListWithCache.length; i++) {
      const item = this.renderListWithCache[i]
      const $item = this.itemGenerator(item)

      if ($item && $item.nodeType === 1) {
        fragment.appendChild($item)
      }
    }

    this.$listInner.innerHTML = ""
    this.$listInner.appendChild(fragment)
    this.$listInner.style.transform = `translateY(-${this.offsetToEdge}px)`

    function withinCache(currentHead, currentTail, renderListWithCache) {
      if (!renderListWithCache.length) return false
      const head = renderListWithCache[0]
      const tail = renderListWithCache[renderListWithCache.length - 1]
      const withinRange = (num, min, max) => num >= min && num <= max

      return withinRange(currentHead, head.index, tail.index) && withinRange(currentTail, head.index, tail.index)
    }

    function updateScrollBar($scrollBar, offset, contentHeight, containerHeight, navigating) {
      // 移动滑块时不用再更新滑块位置
      if (navigating) return

      const barHeight = $scrollBar.clientHeight
      const scrollSpace = containerHeight - barHeight
      const contentSpace = contentHeight - containerHeight

      let rate = offset / contentSpace
      if (rate > 1) {
        rate = 1
      }
      const barOffset = scrollSpace * rate
      $scrollBar.style.transform = `translateY(${barOffset}px)`
    }
  }

  destory() {
    this.unbindEvent()
  }
}

function sumHeight(list, start = 0, end = list.length) {
  let height = 0
  for (let i = start; i < end; i++) {
    height += list[i].height
  }

  return height
}

function findOffsetIndex(list, offset) {
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

function throttle(fn, wait) {
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

function extractPx(string) {
  const r = string.match(/[\d|.]+(?=px)/)
  return r ? Number(r[0]) : 0
}
