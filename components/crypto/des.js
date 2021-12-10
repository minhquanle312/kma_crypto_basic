import { findKeyDES } from '../../features/index.js'
import { arrayToMatrixMn } from '../../utils/index.js'

export const renderK1DES = (key, n = 1) => {
  const result = findKeyDES(key)
  const { hexString, k, PC1, kPlusArray, Cn, Dn, CnDn, PC2n, kn, PC2, k1 } =
    result
  if (key.length !== 8 && key.length !== 16)
    return `<span>Khóa phải có độ dài bằng 8 (đối với mã ASCII) hoặc 16 (HEXA)</span>`

  if (n < 1 || n > 16) return `<span>n không hợp lệ</span>`

  // TODO tạo ma trận có 7 cột
  const PC1Matrix = arrayToMatrixMn(PC1, 7)
  const PC2Matrix = arrayToMatrixMn(PC2n[n], 6)

  const knArray = []
  kn.forEach((item, i) => {
    const result = []
    for (let j = 0; j < k1.length; ) {
      result.push(kn[i].slice(j, j + 6))
      j += 6
    }
    knArray.push(result)
  })

  const matrixHtml = (matrix, header, colspan) =>
    `<table><tr><th colspan="${colspan}">${header}</th></tr>${matrix
      .map(row => `<tr>${row.map(item => `<td>${item}</td>`).join('')}</tr>`)
      .join('')}</table>
    `

  // !Not work?: let nIterator = Cn.slice(0, m)
  // const nIterator = []
  // for(let i = 0,)

  const html = `<div>
  <p>Khóa k sau khi chuyển sang Hexa k = ${hexString}</p>
  <p class="key-binary">Khóa k sau khi chuyển sang nhị phân k = ${k
    .map(val => `<span>${val}</span>`)
    .join(' ')}</p>
  <div class="table-group">
  ${matrixHtml(PC1Matrix, 'PC1', 7)}
  </div>
  <p class="key-binary">k+ = ${kPlusArray
    .map(val => `<span>${val}</span>`)
    .join(' ')}
  </p>
  <p>Ta được:</p>
  <p>C<sub>0</sub> = ${Cn[0]}</p>
  <p>D<sub>0</sub> = ${Dn[0]}</p>
  <p>Dịch vòng trái theo bảng sau:</p>

  <div class="table-group">
  <table>
    <tr><th>Vòng</th>${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      .map(item => `<td>${item}</td>`)
      .join('')}</tr>
    <tr><th>Số bit dịch chuyển</th>${[
      1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1,
    ]
      .map(item => `<td>${item}</td>`)
      .join('')}</tr>
  </table>
  </div>

  ${Cn.map((item, i) =>
    i === 0 || i > n
      ? ''
      : `<p>C<sub>${i}</sub> = ${item}</p><p>D<sub>${i}</sub> = ${Dn[i]}</p><br>`
  ).join('')}

  <p>Từ C<sub>${n}</sub>D<sub>${n}</sub> &rArr; k<sub>${n}</sub> = PC<sub>2</sub>(C<sub>${n}</sub>D<sub>${n}</sub>)</p>
  
  <div class="table-group">
  ${matrixHtml(PC2Matrix, 'PC2', 6)}
  </div>
  <p class="key-binary">k${n} = ${knArray[n]
    .map(val => `<span>${val}</span>`)
    .join(' ')}
  </p>
  </div>`

  return html
}
