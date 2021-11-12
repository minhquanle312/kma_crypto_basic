'use strict'

import {
  multiplyMatrices,
  matrixInZn,
  multiplyMatrixNumber,
  matInverse,
  det,
  gcd,
  ALPHABET,
} from '../utils/index.js'

import { congruenceEquationShort } from './index.js'

// * Mã hóa Hill
// * Chuyển từ chuỗi ký tự sang mảng số trong miền Z26
export const encodeStringArrayNumber = plaintext => {
  const code = plaintext
    .toUpperCase()
    .split('')
    .map(val => ALPHABET.indexOf(val))
  // .join('')
  return code
}

// * chuyển chuỗi sang ma trận miền Z[26]
// ! Hiện tại chỉ dùng ổn định với chuỗi <= 10 (còn update) => hoạt động sai khi khóa dài 16, 25, ... trở lên
const stringToMatrixZ26 = (str, step = 0) => {
  const matrix = []
  let string = [...encodeStringArrayNumber(str)]

  if (step === 0) {
    if (string.length % 2 === 0) {
      step = 2
    } else if (string.length % 3 === 0) {
      step = 3
    }
  }

  for (let i = 0; i < string.length; ) {
    matrix.push(string.slice(i, i + step))
    i += step
  }

  return matrix
}

// ! Hoạt động ổn định với plaintext không giới hạn độ dài (chia hết cho 2 hoặc 3)
// ! key <= 9 (tức 4 hoặc 9 để tạo ma trận vuông)
export const encodeHill = (plaintext, key, isDecode = false) => {
  let message = `k${isDecode ? '(^-1) = CTA * det(K)^(-1)' : ''} = `
  if (typeof key === 'string') {
    key = stringToMatrixZ26(key)
  }

  for (let i = 0; i < key.length; i++) {
    const temp = key[i].join('   ')
    message += `\n${temp}\n`
  }
  plaintext = plaintext.toUpperCase()
  message += `\nTa thấy rằng khóa là ma trận có cỡ ${key.length}x${
    key.length
  } nên bản ${
    isDecode ? 'mã' : 'rõ'
  } sẽ được chia thành các phần tử, mỗi phần tử chứa ${key.length} ký tự:`

  let plaintextMatrix = stringToMatrixZ26(plaintext, key.length)

  const wordArr = []
  for (let i = 0; i < plaintext.length; ) {
    wordArr.push(plaintext.slice(i, i + key.length))
    i += key.length
  }

  const encode = []
  for (let i = 0; i < wordArr.length; i++) {
    let encodeToNumber = matrixInZn(multiplyMatrices([plaintextMatrix[i]], key))
    let decodeToChar = encodeToNumber[0].map(char => ALPHABET[char]).join('')
    encode.push(decodeToChar)

    message += `\n'${wordArr[i]}' <=> (${plaintextMatrix[i].join(
      ', '
    )}) x k = (${encodeToNumber}) => ${decodeToChar}`
  }

  return message + `\nBản ${isDecode ? 'mã' : 'rõ'} là: ${encode.join('')}`
  // return encode
}

// console.log(encodeHill('hocvienhocvienmatmahochimin', 'neverquit'))

// !OLD VERSION BELOW

export const decodeHill = (plaintext, key) => {
  let message = 'k = '
  if (typeof key === 'string') {
    key = stringToMatrixZ26(key)
  }

  // in ma trận, sau này tách hàm
  for (let i = 0; i < key.length; i++) {
    const temp = key[i].join('   ')
    message += `\n${temp}\n`
  }
  plaintext = plaintext.toUpperCase()

  // *Phần giải dưới đầy
  const detK = det(key)
  const detKZ26 = detK < 0 ? 26 - (Math.abs(detK) % 26) : detK % 26
  const isInvertible = gcd(26, detKZ26) === 1 ? true : false
  // console.log(detK, detKZ26, isInvertible)

  message += `\ndet(K) = ${detK} chuyển về Z[26] det(K) = ${detKZ26}`
  message += `\nVì (det(K), 26) = ${gcd(26, detKZ26)} => ma trận ${
    isInvertible ? 'khả nghịch' : 'không khả nghịch'
  }\n(Cái ở dưới viết là C mũ T, A ở dưới nha)\n`

  // Tính ma trận chuyển vị sau đó nhân với detKMinus1
  // Ma trận chuyển vị = det x ma trận nghịch đảo
  const matrixTransposition = multiplyMatrixNumber(detK, matInverse(key))
  const CTA = matrixInZn(matrixTransposition)

  message += 'CTA = \n'
  // in ma trận, sau này tách hàm
  for (let i = 0; i < key.length; i++) {
    const temp = key[i].join('   ')
    message += `\n${temp}\n`
  }
  message += '\n = '
  for (let i = 0; i < matrixTransposition.length; i++) {
    const temp = matrixTransposition[i].join('   ')
    message += `\n${temp}\n`
  }
  message += '\n -> Z[26] CTA = '
  for (let i = 0; i < CTA.length; i++) {
    const temp = CTA[i].join('   ')
    message += `\n${temp}\n`
  }

  const detKMinus1 = congruenceEquationShort(detKZ26, 1, 26)
  message += `det(K)^(-1) = ${detKZ26}^(-1) = ${detKMinus1}\n`

  const kMinus1 = matrixInZn(multiplyMatrixNumber(detKMinus1, CTA))

  const result = encodeHill(plaintext, kMinus1, true)

  return message + result
}

// console.log(decodeHill('FWTVSVJXBKNKGVAEDMWXOGJUGCD', 'neverquit'))
