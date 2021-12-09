import {
  squareNumbers,
  encodeAlphabet,
  numberToZ26,
  arrayToMatrix,
  det,
  gcd,
  multiplyMatrices,
  matrixInZn,
  matrixInAlphabet,
  matInverse,
  multiplyMatrixNumber,
} from '../utils/index.js'

import { congruenceEquation } from './index.js'

export const encodeHill = (plaintext, key, isDecode = false) => {
  // TODO:Chuyển khóa thành ma trận
  const keyArr = encodeAlphabet(key)
  const keyMatrix = arrayToMatrix(keyArr)
  const keyMatrixLength = keyMatrix.length

  // TODO:Error handle
  if (key.length === 0 || key.length === 1)
    return { success: false, errorMessage: 'Độ dài khóa phải lớn hơn 1' }
  if (!squareNumbers.includes(key.length))
    return {
      success: false,
      errorMessage: 'Độ dài khóa phải là 1 số chính phương (VD: 4, 9, 16, ...)',
    }

  // TODO:Tính định thức ma trận và kiểm tra ma trận khả nghịch
  const detK = det(keyMatrix)
  const detKZ26 = numberToZ26(detK)

  const isInvertible = gcd(detKZ26, 26) === 1 ? true : false
  if (!isInvertible) return { success: false, errorMessage: 'isNotInvertible' }

  // TODO:Tìm det(K^-1): dùng cho decode
  const detKMinus1 = congruenceEquation(detKZ26, 1, 26).x

  // TODO: Tìm K^-1: dùng cho decode
  const keyInverse = matInverse(keyMatrix)
  const CTA = matrixInZn(multiplyMatrixNumber(detK, keyInverse))
  const keyInverseZ26 = matrixInZn(multiplyMatrixNumber(detKMinus1, CTA))

  const plaintextMatrix = arrayToMatrix(
    encodeAlphabet(plaintext),
    keyMatrixLength
  )

  const keyPlaintextLength = plaintextMatrix.length

  // TODO: ENCODE
  const encodeNumber = []
  for (let i = 0; i < keyPlaintextLength; i++) {
    isDecode
      ? encodeNumber.push(
          multiplyMatrices([plaintextMatrix[i]], keyInverseZ26).flat()
        )
      : encodeNumber.push(
          multiplyMatrices([plaintextMatrix[i]], keyMatrix).flat()
        )
  }

  const encodeZ26 = matrixInZn(encodeNumber)
  const encodeChar = matrixInAlphabet(encodeZ26)
  const result = encodeChar.flat().join('')

  const kTimesKMinus1 = multiplyMatrices(keyMatrix, keyInverseZ26)

  if (isDecode)
    return {
      success: true,
      isInvertible,
      keyMatrix,
      keyInverseZ26,
      kTimesKMinus1,
      detK,
      detKZ26,
      detKMinus1,
      cyphertextMatrix: plaintextMatrix,
      decodeMatrix: encodeZ26,
      decodeChar: encodeChar,
      decode: result,
    }

  return {
    success: true,
    keyMatrix,
    detK,
    detKZ26,
    detKMinus1,
    plaintextMatrix: plaintextMatrix,
    encodeMatrix: encodeZ26,
    encodeChar: encodeChar,
    encode: result,
  }
}

export const decodeHill = (cyphertext, key) => {
  return encodeHill(cyphertext, key, true)
}
