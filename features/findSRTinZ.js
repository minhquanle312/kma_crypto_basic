'use strict'

// *Tìm s, r, t trong miền Z
export const findSRTinZ = (a, b) => {
  const arr1 = [new Array(10)]

  let r1 = a
  let r2 = b
  let s1 = 1
  let s2 = 0
  let t1 = 0
  let t2 = 1
  let q, r, s, t

  arr1[0][1] = r1
  arr1[0][2] = r2
  arr1[0][4] = s1
  arr1[0][5] = s2
  arr1[0][7] = t1
  arr1[0][8] = t2

  let i = 1

  while (r2 > 0) {
    arr1.push(new Array(10))

    q = Math.trunc(r1 / r2)
    arr1[i - 1][0] = q

    // Updating r's
    r = r1 % r2
    arr1[i - 1][3] = r
    r1 = r2
    r2 = r
    // Updating s's
    s = s1 - q * s2
    arr1[i - 1][6] = s
    s1 = s2
    s2 = s
    // Updating r's
    t = t1 - q * t2
    arr1[i - 1][9] = t
    t1 = t2
    t2 = t

    arr1[i][1] = r1
    arr1[i][2] = r2
    arr1[i][4] = s1
    arr1[i][5] = s2
    arr1[i][7] = t1
    arr1[i][8] = t2

    i += 1
  }
  arr1[i - 1][0] = Math.trunc(arr1[i - 2][1] / arr1[i - 2][2])

  arr1[i - 1][3] = arr1[i - 2][1] % arr1[i - 2][2]

  arr1[i - 1][6] = arr1[i - 2][4] - arr1[i - 2][0] * arr1[i - 2][5]

  arr1[i - 1][9] = arr1[i - 2][7] - arr1[i - 2][0] * arr1[i - 2][8]

  return { arr1, r1, s1, t1 }
}
