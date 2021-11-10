'use strict'

import {
  calcPrimeFactorization,
  numberPrimeFactorization,
  messagePrimeFactorization,
} from '../utils/index.js'
// *Căn nguyên thủy: primitive root => danh sách các căn nguyên thủy của p
export const primitiveRoot = p => {
  let arr2 = []
  const q = p - 1
  const gArr = Array.from({ length: p }, (_, i) => i).slice(2)

  const arr = calcPrimeFactorization(q)
  const primeStr = messagePrimeFactorization(arr)
  const primeNum = numberPrimeFactorization(arr)

  let message = `q = ${q} = ${primeStr} -> `
  for (let i = 0; i < primeNum.length; i++) {
    message += `p${i} = ${primeNum[i]}, `
    arr2.push(q / primeNum[i])
  }

  message += `
  g ⋲ {${gArr.join(', ')}}`

  const list = []
  for (const g of gArr) {
    let flag = true

    message += `
    g = ${g}`

    for (const [index, pi] of Object.entries(primeNum)) {
      message += `
      p${Number(index) + 1} = ${pi}: g^(q/p${Number(index) + 1}) mod p = ${g}^${
        arr2[index]
      } mod ${p} = ${g ** arr2[index] % p}`

      if (g ** (q / pi) % p === 1) {
        message += ` = 1 -> loại`
        flag = false
        break
      } else {
        message += ' != 1'
      }
    }

    if (flag) list.push(g)
  }
  // console.log(list)
  return (message += `

  Vậy ${list.join(', ')} là các căn nguyên thủy của ${p}`)
}
