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
} from '../utils/index.js'
// * Mã hóa Hill
export const encodeHill = (
  plaintext,
  k,
  op = true,
  k_1 = false,
  isDecode = false
) => {
  let opening = `Ta thấy rằng ma trận có cỡ ${k.length}x${k.length} nên bản rõ sẽ được chia thành các phần tử, mỗi phần tử chứa ${k.length} ký tự:`

  let message
  if (op) message += opening
  plaintext = plaintext.toUpperCase()

  const wordArr = []
  for (let i = 0; i < plaintext.length; ) {
    wordArr.push(plaintext.slice(i, i + k.length))
    i += k.length
  }

  const hillCode = [...wordArr].map(word =>
    word
      .split('')
      .map(val => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [code, char] of Object.entries(ALPHABET_CODE)) {
          if (val === char) return code
        }
      })
      .join(' ')
  )

  const encode = []
  for (let i = 0; i < wordArr.length; i++) {
    const subArr = [[...hillCode[i].split(' ')].map(item => Number(item))]
    let encodeNumber = matrixInZn(multiplyMatrices(subArr, k))
    let decodeChar = encodeNumber[0].map(char => ALPHABET_CODE[char]).join('')
    encode.push(decodeChar)

    message += `\n'${wordArr[i]}' <=> (${hillCode[i]
      .split(' ')
      .join(', ')}) x ${
      k_1 === true ? 'k^(-1)' : 'k'
    } = (${encodeNumber}) => ${decodeChar}`
  }

  return (
    message + `\nBản ${isDecode === true ? 'rõ' : 'mã'} là: ${encode.join('')}`
  )
}

console.log(1223423)

export const decodeHill = (plaintext, k) => {
  let detK = det(k)

  console.log(detK)

  // !FIXME: ĐỔI detK VỀ Z[26], BIỆN PHÁP TẠM THỜI, sau phải tách ra hàm riêng để tái sử dụng
  // ! Còn trường hợp detK = 0 chưa biết nên chưa làm, ai có ý kiến thì contribute giúp
  // if (detK > 0) detK = detK % 26
  // else if (detK < 0) {
  //   const temp = Math.ceil(Math.abs(detK) / 26)
  //   detK = (26 * temp) % detK
  // }

  const isInvertible = gcd(26, detK) === 1 ? true : false

  console.log('matrix inverse: ', multiplyMatrixNumber(det(k), matInverse(k)))

  // const kMinus1Temp = matrixInZn(multiplyMatrixNumber(det(k), matInverse(k)))
  const kMinus1Temp = matrixInZn(multiplyMatrixNumber(det(k), matInverse(k)))
  const kMinus1 = []
  for (const row of kMinus1Temp) {
    kMinus1.push(row.map(item => (item < 0 ? item + 26 : item)))
  }

  console.log(kMinus1)

  let message = `k^(-1) = `
  for (const row of kMinus1) {
    message += `${row.join('   ')}\n\t\t`
  }

  // console.log(kMinus1)
  // console.log(matrixInZn(kMinus1))

  message += `\ndet(k) = ${detK}; UCLN(26, det(k)) = ${gcd(26, detK)}`

  if (!isInvertible)
    return (
      message +
      `\nUCLN(26, det(k)) = ${gcd(26, detK)} != 1 nên ma trận không khả nghịch`
    )
  message += `\nVậy k khả nghịch trên Z[26]`

  message += `\n${encodeHill(plaintext, kMinus1, false, true, true)}`

  return message
}
