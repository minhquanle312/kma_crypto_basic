'use strict'

import { gcd } from '../utils/index.js'
// *Phương trình đồng dư: congruence equation
// export const congruenceEquation = (a, b, n) => {
//   const d = gcd(a, n)
//   let x, message
//   const arr = Array.from({ length: n }, (_, i) => i)

//   if (b % d !== 0) {
//     return `d = (a, n) = (${a}, ${n}) = ${d} không phải là ước của ${b} bên phương trình vô nghiệm`
//   }

//   let i = 0
//   while ((arr[i] * a) % n !== b % n) {
//     x = arr[i + 1]
//     i++
//   }

//   message = `d = (a, n) = (${a}, ${n}) = ${d} | ${b} -> phương trình có ${d} nghiệm
//   Phần dư đầy đủ không âm nhỏ nhất của modulo ${n} là:
//   ${arr.join(' ')}
//   Giá trị thỏa phương trình là x0 = ${x}
//   Phương trình có ${d} nghiệm là:
//   `

//   for (let i = 0; i < d; i++) {
//     const equation = `
//     x = ${x} + ${i}*(${n}/${d}) (mod ${n}) <=> x = ${
//       (x + i * (n / d)) % n
//     } (mod ${n})
//     `
//     message += equation
//   }

//   return message
// }

export const congruenceEquation = (a, b, n) => {
  const result = {}
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
