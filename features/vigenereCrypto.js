'use strict'

import {
  matDecompose,
  vecMake,
  vecInit,
  matMake,
  matInit,
  vecShow,
  matShow,
  matProduct,
  matDeterminant,
  multiplyMatrices,
  matrixInZn,
  multiplyMatrixNumber,
  matInverse,
  reduce,
  det,
  gcd,
  calcPrimeFactorization,
  numberPrimeFactorization,
  messagePrimeFactorization,
  messageExponential,
  encodeChar,
  asciiToHex,
  hexToBin,
  primeNumbers,
  ALPHABET_CODE,
  ALPHABET,
  encodeStringArrayNumber,
} from '../utils/index.js'

import {
  calcEuler,
  calcInverseZn,
  congruenceEquation,
  congruenceEquationShort,
  exponentialZn,
  findSRTinZ,
  primitiveRoot,
  encodeHill,
  decodeHill,
  findKeyDES,
} from '../features/index.js'

export const encodeVigenere = (plaintext, key) => {
  let message = ''
  plaintext.toUpperCase()
  key.toUpperCase()

  const plaintextArr = encodeStringArrayNumber(plaintext)
  const keyArr = encodeStringArrayNumber(key)
  const num = Math.ceil(plaintextArr.length / keyArr.length)
  let keyArrFull = []
  for (let i = 0; i < num; i++) {
    keyArrFull = keyArrFull.concat(keyArr)
  }

  keyArrFull = keyArrFull.splice(0, plaintextArr.length)

  message += `${'Bản rõ: '.padEnd(8, ' ')}${plaintextArr
    .map(item => String(item).padEnd(5, ' '))
    .join('')}`
  message += `\n${'Khóa: '.padEnd(8, ' ')}${keyArrFull
    .map(item => String(item).padEnd(5, ' '))
    .join('')}`

  const encodeArr = Array.from(
    { length: plaintextArr.length },
    (_, i) => (plaintextArr[i] + keyArrFull[i]) % 26
  )

  message += `\n${'Bản mã: '.padEnd(8, ' ')}${encodeArr
    .map(item => String(item).padEnd(5, ' '))
    .join('')}`

  const encode = []
  for (const item of encodeArr) {
    encode.push(ALPHABET[item])
  }

  message += `\n${'Ký tự: '.padEnd(8, ' ')}${encode
    .map(item => String(item).padEnd(5, ' '))
    .join('')}`

  return message + `\nVậy kết quả là: ${encode.join('')}`
}

console.log(encodeVigenere('MEETMEATSUNSET', 'CIPHER'))
