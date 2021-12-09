'use strict'

// *Tính lũy thừa trong Z[n] a^k mod n => i[] (index), k[i], A[], b[]
export const exponentialZn = (a, k, n) => {
  const bin = k.toString(2)

  const kiList = [
    ...bin
      .split('')
      .reverse()
      .map(i => Number(i)),
    0,
    0,
  ]

  const AList = []
  const bList = []

  let b = 1
  if ((k = 0)) return b

  const t = kiList.length - 1

  let A = a
  AList[0] = A

  if (kiList[0] === 1) bList[0] = b = A

  for (let i = 1; i <= t; i++) {
    A = A ** 2 % n
    AList.push(A)
    if (kiList[i] === 1) b = (A * b) % n
    bList.push(b)
  }

  return { kiList, AList, bList, b }
}
