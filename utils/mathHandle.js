'use strict'

import { primeNumbers, ALPHABET_CODE, ALPHABET } from './constants.js'

// *Tìm UCLN: greatest common divisor
export const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y))
  return [...arr].reduce((a, b) => _gcd(a, b))
}

// *Phân tích thừa số nguyên tố trả về Object Ex: 616 => {2: 3, 7: 1, 11: 1}
export const primeFactorization = number => {
  const result = {}

  let i = 0
  for (const primeNumber of primeNumbers) {
    while (number % primeNumber === 0) {
      number = number / primeNumber
      i++
    }
    if (i !== 0) Object.assign(result, { [primeNumber]: i })
    i = 0

    if (number === 1) break
  }

  return result
}

// * Chuyển từ ký tự sang số trong miền Z26
export const encodeChar = plaintext => {
  const code = plaintext
    .toUpperCase()
    .split('')
    .map(val => {
      for (const [code, char] of Object.entries(ALPHABET_CODE)) {
        if (val === char) return code
      }
    })
    .join(', ')
  return code
}

// * Chuỗi -> ASCII sang hexa
export const asciiToHex = str => {
  var arr1 = []
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16)
    arr1.push(hex)
  }
  return arr1.join('')
}

export const hexToBin = hex => {
  return parseInt(hex, 16).toString(2).padStart(8, '0')
}

// * Chuyển từ chuỗi ký tự sang mảng số trong miền Z26
export const encodeAlphabet = plaintext => {
  const code = plaintext
    .toUpperCase()
    .split('')
    .map(val => ALPHABET.indexOf(val))
  return code
}

// * Chuyển 1 số sang Z26
export const numberToZ26 = (number, n = 26) => {
  number = Number(number)
  if (number > n - 1) return number % n
  if (number === -0) return 0
  if (number >= 0 && number <= n - 1) return number

  let result = number
  do {
    result = result + n
  } while (result < 0)
  return result
}

// *Giải hệ phương trình bậc I 2 ẩn
export const equationOfSystem = (a1, b1, c1, a2, b2, c2) => {
  let x, y, d, dx, dy
  d = a1 * b2 - b1 * a2
  dx = c1 * b2 - c2 * b1
  dy = a1 * c2 - c1 * a2
  if (d == dx && dx == dy && dy == 0) {
    return false
  }
  if (d != 0) {
    x = parseFloat(dx / d)
    y = parseFloat(dy / d)
    return { x, y, d }
  }
  if ((d == 0 && dx != 0) || (dx == 0 && dy != 0)) {
    return false
  }
}
