// 没有解决循环引用
function deepClone(obj, valueSet = new Set()) {
  if (typeof obj === 'object') {
    var typeString = Object.prototype.toString.call(obj)

    switch (typeString) {
      case '[object Array]':
        return obj.concat([])
      case '[object Object]':
        var newObj = {}
        valueSet.add(obj)

        Object.entries(obj).forEach(([key, value]) => {
          if (valueSet.has(value)) {
            newObj[key] = value
            return
          }
          valueSet.add(value)

          newObj[key] = deepClone(value, valueSet)
        })
        return newObj
      default:
        return obj
    }
  } else {
    return obj
  }
}

function deepAssign(obj) {
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return obj.concat([])
    }

    var newObj = Object.assign({}, obj)
    Object.entries(newObj).forEach((key, value) => {
      if (Object.prototype.toString.call(value) === '[object Object]') {
        newObj[key] = deepAssign(value)
      }
    })
    return newObj
  } else {
    return obj
  }
}

var obj = {
  a: {
    b: 1,
    aa: { aaa: 2 },
  },
  c: 2,
  d: [1, 2, 3],
  e: function () {},
  f: /xxx/g,
}
obj.a.b = obj

var b = deepClone(obj)
// var b = deepAssign(obj)
console.log(b)
console.log(b.a.aa === obj.a.aa)
