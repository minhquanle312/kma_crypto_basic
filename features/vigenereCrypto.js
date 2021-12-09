'use strict'

import { ALPHABET, encodeAlphabet, numberToZ26 } from '../utils/index.js'

export const encodeVigenere = (plaintext, key, isDecode = false) => {
  plaintext.toUpperCase()
  key.toUpperCase()

  const plaintextArr = encodeAlphabet(plaintext)
  const keyArr = encodeAlphabet(key)

  // Số lần lặp lại của khóa
  const num = Math.ceil(plaintextArr.length / keyArr.length)
  let keyArrFull = []
  for (let i = 0; i < num; i++) {
    keyArrFull = keyArrFull.concat(keyArr)
  }

  keyArrFull = keyArrFull.splice(0, plaintextArr.length)

  const encodeArr = Array.from({ length: plaintextArr.length }, (_, i) =>
    isDecode
      ? numberToZ26(plaintextArr[i] - keyArrFull[i])
      : numberToZ26(plaintextArr[i] + keyArrFull[i])
  )

  const encode = []
  for (const item of encodeArr) {
    encode.push(ALPHABET[item])
  }

  return {
    plaintext: plaintextArr,
    key: keyArrFull,
    encodeNumber: encodeArr,
    char: encode,
    encode: encode.join(''),
  }
}

export const decodeVigenere = (cyphertext, key) =>
  encodeVigenere(cyphertext, key, true)
