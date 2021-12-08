import { findSRTinZ } from '../../features/findSRTinZ.js'

export const renderSRTinZ = (a, b) => {
  const { arr1, r1, s1, t1 } = findSRTinZ(a, b)

  return `
  <table>
    <tr>
      ${['q', 'r1', 'r2', 'r', 's1', 's2', 's', 't1', 't2', 't']
        .map(item => `<th>${item}</th>`)
        .join('')}
    </tr>
    ${arr1
      .map(
        (subArr, index) =>
          `<tr>${subArr.map(item => `<td>${item}</td>`).join('')}</tr>`
      )
      .join('')}
  </table>
  <p>Kết quả r: ${r1}, s: ${s1}, t: ${t1}</p>
  `
}
