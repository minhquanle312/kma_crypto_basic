import {
  ALPHABET,
  encodeAlphabet,
  numberToZ26,
  equationOfSystem,
} from '../utils/index.js'
import { calcInverseZn } from './index.js'

export const encodeAffine = (plaintext, key, type = 'encode') => {
  plaintext = plaintext.toUpperCase()
  const [a, b] = key.split(',').map(val => Number(val))

  // * Calc inverse of a in Z[n]
  const aInverse = calcInverseZn(a, 26).result

  // ?encode function: e(k) = a*x + b
  const encodeFunc = (a, b, number) => numberToZ26(a * number + b)

  // ?decode function: d(k) = (a*(-1) mod 26) * (y - b)
  const decodeFunc = (b, number) => numberToZ26(aInverse * (number - b))

  const plaintextArrNum = encodeAlphabet(plaintext)

  const encodeArrNum = plaintextArrNum.map(val => encodeFunc(a, b, val))
  const encode = encodeArrNum.map(val => ALPHABET[val]).join('')

  const decodeArrNum = plaintextArrNum.map(val => decodeFunc(b, val))
  const decode = decodeArrNum.map(val => ALPHABET[val]).join('')

  // console.log('running')
  const result = { a, b, aInverse, plaintextArrNum }
  // console.log(result)
  if (type === 'encode') {
    // console.log(1)
    return { ...result, encodeArrNum, encode }
  } else if (type === 'decode') {
    // console.log(2)
    return {
      ...result,
      encodeArrNum: decodeArrNum,
      encode: decode,
    }
  } else return false
}

export const encodeAffineWithChar = (
  // plaintext,
  a,
  aEncode,
  b,
  bEncode
  // type = 'encode'
) => {
  a = a.toUpperCase()
  aEncode = aEncode.toUpperCase()
  b = b.toUpperCase()
  bEncode = bEncode.toUpperCase()

  const aNum = ALPHABET.indexOf(a)
  const aEncodeNum = ALPHABET.indexOf(aEncode)
  const bNum = ALPHABET.indexOf(b)
  const bEncodeNum = ALPHABET.indexOf(bEncode)

  const equationResult = equationOfSystem(
    aNum,
    1,
    aEncodeNum,
    bNum,
    1,
    bEncodeNum
  )
  // console.log(equationResult)
  const { x, y, d } = equationResult
  // console.log(x * d)

  const aResult = numberToZ26(x * -d * calcInverseZn(-d, 26).result)
  const bResult = numberToZ26(y * -d * calcInverseZn(-d, 26).result)
  // console.log(a, b)
  // const result = encodeAffine(plaintext, `${a}, ${b}`, type)
  // console.log(result)
  const result = {
    x,
    y,
    d,
    aResult,
    bResult,
    aNum,
    aEncodeNum,
    bNum,
    bEncodeNum,
  }
  return result
}
