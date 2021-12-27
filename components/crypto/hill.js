'use strict'

import { encodeHill, decodeHill } from '../../features/index.js'
import { ALPHABET, gcd } from '../../utils/index.js'

export const renderEncodeHill = (
  plaintext,
  key,
  isDecode = false,
  decodeHtml,
  decodeKey
) => {
  const result = encodeHill(plaintext, key)

  const {
    success,
    // keyMatrix,
    plaintextMatrix,
    encodeMatrix,
    encodeChar,
    encode,
  } = result

  let { keyMatrix } = result

  if (success === false && !key.includes(',')) {
    return `${result.errorMessage}`
  }

  if (isDecode) keyMatrix = decodeKey

  const html = `<div>
    k = <table style="display: inline-table;">${keyMatrix
      .map(row => `<tr>${row.map(item => `<td>${item}</td>`).join('')}</tr>`)
      .join('')}</table>
    ${isDecode ? decodeHtml : ''}
    <p>Ta thấy rằng khóa là ma trận vuông ${keyMatrix.length}&times;${
    keyMatrix.length
  } nên bản ${isDecode ? 'mã' : 'rõ'} sẽ được chia thành ${
    plaintextMatrix.length
  } phần, mỗi phần có ${keyMatrix.length} ký tự</p>
  <br>
  ${plaintextMatrix
    .map(
      (row, i) =>
        `'${row.map(item => ALPHABET[item]).join('')}' &hArr; (${row.join(
          ', '
        )}) &times; k = (${encodeMatrix[i].join(', ')}) &rArr;	${encodeChar[
          i
        ].join('')}`
    )
    .join('<br>')}
  <p>Bản ${isDecode ? 'rõ' : 'mã'} là: ${encode}</p>
  </div>
  `

  return html
}

export const renderDecodeHill = (cyphertext, key) => {
  const result = decodeHill(cyphertext, key)
  const {
    success,
    isInvertible,
    keyMatrix,
    keyInverseZ26,
    kTimesKMinus1,
    detK,
    detKZ26,
  } = result

  if (success === false && result.errorMessage !== 'isNotInvertible') {
    return `${result.errorMessage}`
  }

  const keyInverse = keyInverseZ26
    .flat()
    .map(val => ALPHABET[val])
    .join('')
  console.log(keyInverse)

  const createMatrixUnit = degree => {
    const matrix = Array.from({ length: degree }, (_, i) => [])

    for (let i = 0; i < degree; i++) {
      for (let j = 0; j < degree; j++) {
        i === j ? (matrix[i][j] = 1) : (matrix[i][j] = 0)
      }
    }

    return matrix
  }

  const matrixUnit = createMatrixUnit(keyMatrix.length)

  const isInvertibleHtml = `
  <div>
  <p>detK = ${detK} chuyển về Z<sub>26</sub> &rarr; detK = ${detKZ26}</p>
  <p>Vì (detK, 26) = ${gcd(detKZ26, 26)} &rArr; Ma trận ${
    isInvertible ? '' : 'không'
  } khả nghịch</p>
  </div>
  `

  if (!isInvertible) return isInvertibleHtml

  const matrixHtml = matrix =>
    `<table style="display: inline-table;">${matrix
      .map(row => `<tr>${row.map(item => `<td>${item}</td>`).join('')}</tr>`)
      .join('')}</table>`

  const html = `
  <div>
    ${isInvertibleHtml}
    <p>Ta có K&times;K<sup>-1</sup> mod 26 = I với I là ma trận đơn vị</p>
    <p>&rArr; K<sup>-1</sup> = ${matrixHtml(keyInverseZ26)}</p>
    <p>Vì K&times;K<sup>-1</sup> = ${matrixHtml(
      keyMatrix
    )} &times; ${matrixHtml(keyInverseZ26)} = ${matrixHtml(
    kTimesKMinus1
  )} mod 26 = ${matrixHtml(matrixUnit)}</p>
  </div>
  `

  const templateHtml = renderEncodeHill(
    cyphertext,
    keyInverse,
    true,
    html,
    keyMatrix
  )

  return templateHtml
}
