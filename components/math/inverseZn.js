import { calcInverseZn } from '../../features/calcInverseZn.js'

export const renderInverseZn = (b, n) => {
  b = Number(b)
  n = Number(n)
  const { arr1, x, result } = calcInverseZn(b, n)

  return `
  <table>
    <tr>
      ${['q', 'r1', 'r2', 'r', 't1', 't2', 't']
        .map(item => `<th>${item}</th>`)
        .join('')}
    </tr>
    ${arr1
      .map(
        (subArr, index) =>
          `<tr>${subArr
            .map(item =>
              item === undefined ? '<td></td>' : `<td>${item}</td>`
            )
            .join('')}</tr>`
      )
      .join('')}
  </table>
  <p>&rArr; x = ${
    x >= 0 && x <= n ? `${result}` : `${x} = ${n} - ${-x} = ${result}`
  }</p>
  `
}
