'use strict'

import { primeFactorization } from '../utils/mathHandle.js'

// *Tính ø Euler
export const calcEuler = a => {
  let result = a
  const prime = primeFactorization(a)

  for (const [key, value] of Object.entries(prime)) {
    result = result * (1 - 1 / key)
  }

  return result
}
