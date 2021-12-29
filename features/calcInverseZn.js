'use strict'

import { numberToZ26 } from '../utils/index.js'

// *Tìm x trong miền Z[n]: tính nghịch đảo trong Z[n]
export const calcInverseZn = (b, n) => {
  const arr1 = [new Array(7)]

  let r1 = n
  let r2 = b
  let t1 = 0
  let t2 = 1
  let q, r, t

  arr1[0][1] = r1
  arr1[0][2] = r2
  arr1[0][4] = t1
  arr1[0][5] = t2

  let i = 1

  while (r2 > 0) {
    arr1.push(new Array(7))

    q = Math.trunc(r1 / r2)
    arr1[i - 1][0] = q

    // Updating r's
    r = r1 % r2
    arr1[i - 1][3] = r
    r1 = r2
    r2 = r
    // Updating r's
    t = t1 - q * t2
    arr1[i - 1][6] = t
    t1 = t2
    t2 = t

    arr1[i][1] = r1
    arr1[i][2] = r2
    arr1[i][4] = t1
    arr1[i][5] = t2

    i += 1
  }

  let x // x <=> b^(-1)
  if (r1 === 1) x = t1

  arr1[i - 1][0] = undefined
  arr1[i - 1][3] = undefined
  arr1[i - 1][6] = undefined

  const result = numberToZ26(x, n)
  console.log(result)

  return { arr1, x, result }
}
