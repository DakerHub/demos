// cookie 属性
// key=value

// cookie 有效期
// Expires=Wed, 21 Oct 2015 07:28:00 GMT
// Max-Age=120

// cookie 访问
// Secure
// HttpOnly

// cookie 作用域
// Domain
// Path
// SameSite

export function getCookie(key) {
  var pairs = document.cookie.split(';').map((s) => s.trim().split('='))

  var kv = pairs.find(([name]) => name === key)
  return kv ? kv[1] : undefined
}

export function delCookie(key) {
  if (getCookie(key) === undefined) return

  document.cookie = `${key}=; Max-Age=0;`
}

export function setCookie(key, value, maxAge) {
  let cookie = `${key}=${value};`
  if (maxAge != 0 && typeof maxAge === 'number') {
    cookie += ` Max-Age=${maxAge};`
  }

  document.cookie = cookie
}
