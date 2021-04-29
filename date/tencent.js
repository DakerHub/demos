var weekMap = {
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日',
}
function getTime(time) {
  var thatDate = new Date(time)
  var today = new Date()
  var y = thatDate.getFullYear()
  var m = thatDate.getMonth() + 1
  var d = thatDate.getDate()
  var h = thatDate.getHours()
  var min = thatDate.getMinutes()
  var ty = today.getFullYear()
  var tm = today.getMonth() + 1
  var td = today.getDate()
  var tw = today.getDay()

  var weekStart = getDateBefore(tw - 1)
  var lastDay = getDateBefore(1)
  var lastTowWeek = getDateBefore(tw - 1 + 7)

  if (y === ty && m === tm && d === td) {
    return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
  }

  if (thatDate.getTime() > lastDay.getTime()) {
    return '昨天'
  }

  if (thatDate.getTime() > weekStart.getTime()) {
    return weekMap[thatDate.getDay()]
  }

  if (thatDate.getTime() > lastTowWeek.getTime()) {
    return `${y.toString().substring(2)}/${m}/${d}`
  }

  return null
}

function getDateBefore(n) {
  var oneDay = 24 * 60 * 60 * 1000
  var t = Date.now()
  for (let i = 0; i < n; i++) {
    t = t - oneDay
  }

  var tDate = new Date(t)
  return new Date(tDate.getFullYear(), tDate.getMonth(), tDate.getDate())
}

console.log(getTime('2021-4-28 9:01:00'))
console.log(getTime('2021-4-27 9:01:00'))
console.log(getTime('2021-4-26 9:01:00'))
console.log(getTime('2021-4-25 9:01:00'))
console.log(getTime('2021-4-24 9:01:00'))
console.log(getTime('2021-4-19 9:01:00'))
console.log(getTime('2021-4-18 9:01:00'))
