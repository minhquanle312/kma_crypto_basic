'use strict'

import { encodeVigenere, decodeVigenere } from '../../features/index.js'

export const renderEncodeVigenere = (
  plaintextInput,
  keyInput,
  isDecode = false
) => {
  const result = isDecode
    ? decodeVigenere(plaintextInput, keyInput)
    : encodeVigenere(plaintextInput, keyInput)
  const { plaintext, key, encodeNumber, char, encode } = result

  return `
  <table>
    <tr>
      <th>${isDecode ? 'Bản mã' : 'Bản rõ'}</th>
      ${plaintext.map(item => `<td>${item}</td>`).join('')}
    </tr>
    <tr>
      <th>Khóa</th>
      ${key.map(item => `<td>${item}</td>`).join('')}
    </tr>
    <tr>
      <th>${isDecode ? 'Bản rõ' : 'Bản mã'}</th>
      ${encodeNumber.map(item => `<td>${item}</td>`).join('')}
    </tr>
    <tr>
      <th>Ký tự</th>
      ${char.map(item => `<td>${item}</td>`).join('')}
    </tr>
  </table>
  <p>Kết quả: ${encode}</p>
  `
}

// console.log(encodeVigenere('hocvienhocvienmatmahochimin', 'neverquit'))
export const renderDecodeVigenere = (cyphertextInput, keyInput) =>
  renderEncodeVigenere(cyphertextInput, keyInput, true)
