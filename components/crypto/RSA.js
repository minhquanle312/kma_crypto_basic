import { rsa } from '../../features/index.js'

export const renderRSA = (p, q, e, m) => {
  p = Number(p)
  q = Number(q)
  e = Number(e)
  m = Number(m)
  const result = rsa(p, q, e, m)
  const { N, n, d, encodeTable, C, decodeTable, M } = result

  const newArr = kiArray => {
    const arrResult = [...kiArray].reverse()
    let tempArr = []

    for (let i = 0; i < arrResult.length; i++) {
      if (arrResult[i] === 1) tempArr.push(arrResult.slice(i))
    }

    return kiArray.slice(0, tempArr[0].length)
  }

  const kiEncodeArr = newArr(encodeTable.kiList)
  const encodeLength = kiEncodeArr.length
  const aEncodeArray = [...encodeTable.AList].slice(0, encodeLength)
  const bEncodeArray = [...encodeTable.bList].slice(0, encodeLength)

  const kiDecodeArr = newArr(decodeTable.kiList)
  const decodeLength = kiDecodeArr.length
  const aDecodeArray = [...decodeTable.AList].slice(0, decodeLength)
  const bDecodeArray = [...decodeTable.bList].slice(0, decodeLength)

  const renderTable = (kArr, aArr, bArr) => {
    return `
    <table>
      <tr>
        <th>i</th>
        ${kArr.map((item, i) => `<td>${i}</td>`).join('')}
      </tr>
      <tr>
        <th>K<sub>i</sub></th>
        ${kArr.map(item => `<td>${item}</td>`).join('')}
      </tr>
      <tr>
        <th>A</th>
        ${aArr.map(item => `<td>${item}</td>`).join('')}
      </tr>
      <tr>
        <th>b</th>
        ${bArr.map(item => `<td>${item}</td>`).join('')}
      </tr>
    </table>`
  }

  return `
  <div>
    N = p.q = ${N}<br>
    Φn = (p - 1)(q - 1) = ${p - 1}.${q - 1} = ${n}<br>
    d là nghịch đảo của e trong module Φn:<br>
    d.e &equiv; 1 (mod Φn)<br>
    Vì d.${e} &equiv; 1 (mod ${n}) &rArr; d = ${d}<br>
    Khoá công khai: K<sub>u</sub> = (e, N) = (${e}, ${N})<br>

    * Mã hóa: C = E(M, K<sub>u</sub>) = M<sup>e</sup> mod N <br>
    Ta có ${e} = ${Number(e).toString(2)}<sub>2</sub><br>
    ${renderTable(kiEncodeArr, aEncodeArray, bEncodeArray)}<br>
    &rArr; C = ${C}<br>

    * Giải mã: M = D(C, K<sub>r</sub>) = C<sup>d</sup> mod N <br>
    Ta có ${d} = ${Number(d).toString(2)}<sub>2</sub><br>
    ${renderTable(kiDecodeArr, aDecodeArray, bDecodeArray)}<br>
    &rArr; M = ${M}<br>

    Khoá bí mật: K<sub>r</sub> = (d, N) = (${d}, ${N})
  </div>
  `
}
