import { Cookie } from '..'

/**
 * Converts a string to HTTP Cookie
 *
 * @param s {string} A string to convert
 *
 * @return {Cookie} HTTP Cookie
 */
export const toCookie = (s: string): Cookie => {
  const cookie = {
    common: {},
    fields: {},
    toString: () => {
      let i = 0
      const pairs = new Array<string>(cookie.fields.length)
      for (const name in cookie.fields)
        pairs[i++] = `${name}=${cookie.fields[name]}`
      return pairs.join('; ').trim()
    },
  } as Cookie
  for (const pair of s.split(';')) {
    const kv = pair.split('=')
    const key = kv[0].trim()
    switch (key) {
      case 'Domain':
      case 'Path':
        cookie.common[key] = kv[1]
        break
      case 'Expires':
        cookie.common.Expires = new Date(kv[1])
        break
      case 'HttpOnly':
      case 'Secure':
        cookie.common[key] = true
        break
      default:
        cookie.fields[key] = kv.slice(1).join('=')
        break
    }
  }
  return cookie
}
