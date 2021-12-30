import { primitiveRoot, discreteLogarithm } from '../../features/index.js'

import { primeFactorization } from '../../utils/index.js'

export const renderPrimitiveRoot = p => {
  const result = primitiveRoot(p)

  const q = p - 1
  const arr = Array.from({ length: q - 1 }, (_, i) => i + 2)

  const keys = Object.keys(primeFactorization(q))
  const values = Object.values(primeFactorization(q))

  return `
  <div>
    <p>q = p - 1 = ${p} - 1 = ${q} = ${values
    .map((value, i) => `${keys[i]}${value !== 1 ? `<sup>${value}</sup>` : ''}`)
    .join('&times;')} &rarr; ${keys
    .map((key, i) => `p<sub>${i + 1}</sub> = ${key}`)
    .join(', ')}</p>
    <p>g &isin; {${arr.join(', ')}}</p>
    <p>Cái bên dưới chép 2 cái đầu tiên thôi, sau đó ghi: <br><span style="color: red;">* Tương tự ta tìm g = ... là các căn nguyên thủy của ${p}</span></p>
    <p>${arr
      .map(
        (item, i) =>
          `* g = ${item}:<br>${keys
            .map(
              (key, i) =>
                `&ensp;&bull; p<sub>${
                  i + 1
                }</sub> = ${key}: g<sup><sup>q</sup>&frasl;<sub>p<sub>${
                  i + 1
                }</sub></sub></sup> mod p = ${item}<sup>${
                  q / key
                }</sup> mod ${p} = ${item ** (q / key) % p} ${
                  item ** (q / key) % p === 1 ? '= 1 &rarr; loại' : '&ne; 1'
                }<br>`
            )
            .join('')}`
      )
      .join('')}</p>
    <p>Vậy ${result.join(', ')} là căn nguyên thủy của ${p}</p>
  </div>
  `
}

//  *Logarithm rời rạc trong Z[n]
export const renderDiscreteLogarithm = (r, p) => {
  r = Number(r)
  p = Number(p)
  const result = discreteLogarithm(r, p)

  return `
  <p>Ta có: r<sup>e</sup> mod p = a (1 &le; e &le; (p - 1), khi đó e là logarit rời rạc của a theo module p, ký hiệu: log<sub>r</sub>a = e</p>
  <p>${r}<sup style="color: #228be6;">${
    result[0]
  }</sup> = <span style="color: #fd7e14;">1</span> trong Z<sub>${p}</sub> &rarr; log<sub>${r}</sub><span style="color: #fd7e14;">1</span> = <span style="color: #228be6;">${
    result[0]
  }</span> trong Z<sub>${p}</sub></p>
  <p>${r}<sup style="color: #228be6;">${
    result[1]
  }</sup> = <span style="color: #fd7e14;">2</span> trong Z<sub>${p}</sub> &rarr; log<sub>${r}</sub><span style="color: #fd7e14;">2</span> = <span style="color: #228be6;">${
    result[1]
  }</span> trong Z<sub>${p}</sub></p>
  <p>Tương tự với các số còn lại ta được bảng bên dưới: <span style="color: red;">(thay số bên trên để bài nhìn khác nhau)</span></p>
  <table>
    <tr>
      <th>a</th>
      ${result
        .map((_, i) => `<td style="color: #fd7e14;">${i + 1}</td>`)
        .join('')}
    </tr>
    <tr>
      <th>log<sub>r</sub>a</th>
      ${result.map(item => `<td style="color: #228be6;">${item}</td>`).join('')}
    </tr>
  </table>
  `
}
