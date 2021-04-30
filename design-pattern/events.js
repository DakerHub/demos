function EventEmitter() {
  // 未初始化，或者初始化了，但是_events不在本对象上
  // if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
  // 创建一个OwnProperty
  // this._eventsCount = 0
  // }
  this._events = Object.create(null)
}

// 共享属性
// EventEmitter.prototype._events = undefined
// EventEmitter.prototype._eventsCount = 0

EventEmitter.prototype.addListener = function (type, callback) {
  const existing = this._events[type]
  if (existing === undefined) {
    this._events[type] = callback
  } else if (typeof existing === 'function') {
    this._events[type] = [existing, callback]
  } else if (Array.isArray(existing)) {
    existing.push(callback)
  }

  return this
}

EventEmitter.prototype.emit = function (type, ...args) {
  var handler = this._events[type]

  if (handler === undefined) {
    return false
  }

  if (typeof handler === 'function') {
    handler.apply(this, args)
  } else {
    var handlers = handler.concat([])

    handlers.forEach((h) => {
      h.apply(this, args)
    })
  }

  return true
}

var ee = new EventEmitter()

ee.addListener('say', function (word) {
  console.log('Hi, ', word)
})

ee.emit('say', 'Daker')
