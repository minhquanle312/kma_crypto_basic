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

// export const primitiveRoot = p => {
//   let arr2 = []
//   const q = p - 1
//   const gArr = Array.from({ length: p }, (_, i) => i).slice(2)

//   const arr = calcPrimeFactorization(q)
//   const primeStr = messagePrimeFactorization(arr)
//   const primeNum = numberPrimeFactorization(arr)

//   let message = `q = ${q} = ${primeStr} -> `
//   for (let i = 0; i < primeNum.length; i++) {
//     message += `p${i} = ${primeNum[i]}, `
//     arr2.push(q / primeNum[i])
//   }

//   message += `
//   g ⋲ {${gArr.join(', ')}}`

//   const list = []
//   for (const g of gArr) {
//     let flag = true

//     message += `
//     g = ${g}`

//     for (const [index, pi] of Object.entries(primeNum)) {
//       message += `
//       p${Number(index) + 1} = ${pi}: g^(q/p${Number(index) + 1}) mod p = ${g}^${
//         arr2[index]
//       } mod ${p} = ${g ** arr2[index] % p}`

//       if (g ** (q / pi) % p === 1) {
//         message += ` = 1 -> loại`
//         flag = false
//         break
//       } else {
//         message += ' != 1'
//       }
//     }

//     if (flag) list.push(g)
//   }
//   // console.log(list)
//   return (message += `

//   Vậy ${list.join(', ')} là các căn nguyên thủy của ${p}`)
// }
