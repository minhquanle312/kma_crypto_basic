import { exponentialZn } from '../../features/exponentialZn.js'

export const renderExponentialZn = (a, k, n) => {
  const result = exponentialZn(Number(a), Number(k), Number(n))

  const { kiList, AList, b } = result

  const exponential = `${a}<sup>${k}</sup> = ${kiList
    .slice(0, -2)
    .map((item, i) => (item === 1 ? `${a}<sup>${2 ** i}</sup>&times;` : ''))
    .join('')
    .slice(0, -7)}`

  const html = `<div>
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

  return html
}

// <br>${a}<sup>1</sup> mod ${n} = ${a} mod ${n} = ${a}<br>
