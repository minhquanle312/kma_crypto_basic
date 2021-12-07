'use strict'

import {
  primeFactorization,
  calcPrimeFactorization,
  messagePrimeFactorization,
} from '../utils/mathHandle.js'

// *Tính ø Euler
// export const calcEuler = a => {
//   const b = a
//   let result = a

//   const primeList = calcPrimeFactorization(a)
//   // console.log(primeList)

//   let message =
//     `Vì ${b} = ` + messagePrimeFactorization(primeList) + `-> ø(${b}) = ${b}`

//   primeList.forEach((number, i) => {
//     if (number !== 0) {
//       result *= 1 - 1 / primeNumbers[i]
//       message = message + `(1 - 1/${primeNumbers[i]})`
//     }
//   })

//   return message + ' = ' + Math.trunc(result)
// }

export const calcEuler = a => {
  let result = a
  const prime = primeFactorization(a)

  for (const [key, value] of Object.entries(prime)) {
    result = result * (1 - 1 / key)
  }

  return result
}
