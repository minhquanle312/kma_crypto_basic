import { findKeyDES } from '../../features/index.js'
import { arrayToMatrixMn } from '../../utils/index.js'

export const renderK1DES = key => {
  const result = findKeyDES(key)
  console.log(result)
  const { hexString, k, PC1, PC2, k1 } = result
  if (key.length !== 8) return `<span>Khóa phải có độ dài bằng 8</span>`

  // TODO tạo ma trận có 7 cột
  const PC1Matrix = arrayToMatrixMn(PC1, 7)
  const PC2Matrix = arrayToMatrixMn(PC2, 6)
  console.log(PC1Matrix)

  const matrixHtml = (matrix, header, colspan) =>
    `<table><tr><th colspan="${colspan}">${header}</th></tr>${matrix
      .map(row => `<tr>${row.map(item => `<td>${item}</td>`).join('')}</tr>`)
      .join('')}</table>`

  const html = `<div>
  <p>Khóa k sau khi chuyển sang Hexa k = ${hexString}</p>
  <p class="key-binary">Khóa k sau khi chuyển sang nhị phân k = ${k
    .map(val => `<span>${val}</span>`)
    .join(' ')}</p>
  <div class="table-group">
    ${matrixHtml(PC1Matrix, 'PC1', 7)}
    ${matrixHtml(PC2Matrix, 'PC2', 6)}
  </div>
  <p>K1 = ${k1}</p>
  </div>`

  return html
}
