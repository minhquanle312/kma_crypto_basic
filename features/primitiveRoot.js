'use strict'

import { primeFactorization } from '../utils/index.js'

// *Căn nguyên thủy: primitive root => danh sách các căn nguyên thủy của p
export const primitiveRoot = p => {
  const result = []
  const q = p - 1
  const keys = Object.keys(primeFactorization(q))
  const keyLength = keys.length

  for (let g = 2; g < p; g++) {
    let flag = true
    for (let i = 0; i < keyLength; i++) {
      if (g ** (q / keys[i]) % p === 1) {
        flag = false
        break
      }
    }
    if (flag) result.push(g)
  }

  return result
}

// *Tính logarit rời rặc của r là căn nguyên thủy của p
export const discreteLogarithm = (r, p) => {
  const result = Array.from({ length: p - 1 })

  let i = 1

  while (result.includes(undefined)) {
    let a = r ** i % p
    result[a - 1] = i
    i++
  }

  return result
}
