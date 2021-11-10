'use strict'

import { primeNumbers, ALPHABET_CODE } from './constants.js'

// *Tìm UCLN: greatest common divisor
export const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y))
  return [...arr].reduce((a, b) => _gcd(a, b))
}

// *Phân tích thừa số nguyên tố: trả về mảng là các số mũ ở vị trí số nguyên tố tương ứng trong mảng Prime Number
export const calcPrimeFactorization = number => {
  const result = []
  let i = 0
  for (const item of primeNumbers) {
    while (number % item === 0) {
      number = number / item
      i++
    }
    result.push(i)
    i = 0

    if (number === 1) break
  }
  return result
}

// *Phân tích thừa số nguyên tố (vd: 200 = 2^3x5^2 => return [2, 5]): trả về mảng là các số nguyên tố
export const numberPrimeFactorization = arrayPrimeFactorization => {
  const result = []
  arrayPrimeFactorization.forEach(
    (number, i) => number !== 0 && result.push(primeNumbers[i])
  )
  return result
}

// *Phân tích thừa số nguyên tố thành chuỗi: nhận vào mảng calcPrimeFactorization return chuỗi
export const messagePrimeFactorization = arrayPrimeFactorization => {
  let message = ' '
  arrayPrimeFactorization.forEach((number, i) => {
    if (number !== 0) {
      message =
        message +
        `${message.slice(-1) === ' ' ? '' : 'x'}` +
        `${primeNumbers[i]}${number === 1 ? '' : `^${number}`}`
    }
  })
  return message
}

// *Input(a, b) <=> a^b EX: 5^41 = 5^32x5^8x5^1
export const messageExponential = (a, b) => {
  const arr = b
    .toString(2)
    .split('')
    .reverse()
    .map(item => Number(item))

  let message = `${a}^${b} = `

  arr.forEach((num, i) => {
    if (arr[i] !== 0)
      message =
        message + `${message.slice(-1) === ' ' ? '' : 'x'}` + `${a}^${2 ** i}`
  })

  return message
}

// * Chuyển từ ký tự sang số
export const encodeChar = plaintext => {
  const code = plaintext
    .toUpperCase()
    .split('')
    .map(val => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [code, char] of Object.entries(ALPHABET_CODE)) {
        if (val === char) return code
      }
    })
    .join(', ')
  return code
}

// * Mã hóa DES
export const asciiToHex = str => {
  var arr1 = []
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16)
    arr1.push(hex)
  }
  return arr1.join('')
}

export const hexToBin = hex => {
  return parseInt(hex, 16).toString(2).padStart(8, '0')
}
// console.log(asciiToHex('NEVRQUIT'))
// Chỉ đúng với 2 ký tự
// console.log(hexToBin('4E'))

// var result = ''
// '21 23 00 6A D0 0F 69 4C E1 20'.split(' ').forEach(str => {
//   result += hexToBin(str)
// })
// console.log(result)
// var result = ''
// '41 54 31 35 30 37 33 39'.split(' ').forEach(str => {
//   result += hexToBin(str)
// })
// console.log(result)
