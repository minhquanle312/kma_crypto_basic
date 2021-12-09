'use strict'

import { gcd } from '../utils/index.js'
// *Phương trình đồng dư: congruence equation
export const congruenceEquation = (a, b, n) => {
  const d = gcd(a, n)
  const arr = Array.from({ length: n }, (_, i) => i)

  if (b % d !== 0) {
    return false
  }

  let x
  let i = 0
  while ((arr[i] * a) % n !== b % n) {
    x = arr[i + 1]
    i++
  }
  return { d, arr, x }
}

// * Chỉ trả về kết quả phương trình đồng dư (ax = b (mod n)) => x
export const congruenceEquationShort = (a, b, n) => {
  let x
  const arr = Array.from({ length: n }, (_, i) => i)

  if (b % gcd(a, n) !== 0) return false

  let i = 0
  while ((arr[i] * a) % n !== b % n) {
    x = arr[i + 1]
    i++
  }

  return x
}

// console.log(congruenceEquationShort(6, 27, 33))
