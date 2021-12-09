import { exponentialZn } from '../../features/exponentialZn.js'

export const renderExponentialZn = (a, k, n) => {
  k = Number(k)
  if (k === 0) return `<div>${a}<sup>${k}</sup> mod ${n} = ${a}</div>`
  if (a < 0 || a > n) return `<div style="color: red;">a không hợp lệ</div>`

  const { kiList, AList, b } = exponentialZn(Number(a), Number(k), Number(n))

  const exponential = `${a}<sup>${k}</sup> = ${kiList
    .slice(0, -2)
    .map((item, i) => (item === 1 ? `${a}<sup>${2 ** i}</sup>&times;` : ''))
    .join('')
    .slice(0, -7)}`

  return `<div>
  Ta có: ${k} = ${Number(k).toString(2)} &rarr; ${exponential}
    <br>
    ${AList.slice(0, -2)
      .map(
        (item, i) =>
          `${a}<sup>${2 ** i}</sup> mod ${n} = ${a}<sup>${
            i !== 0 ? 2 ** (i - 1) : ''
          }</sup> &times; ${a}<sup>${
            i !== 0 ? 2 ** (i - 1) : ''
          }</sup> = ${item}`
      )
      .join('<br>')}
    <br>
    &rArr; ${exponential} = ${b}
    </div>
    `
}
