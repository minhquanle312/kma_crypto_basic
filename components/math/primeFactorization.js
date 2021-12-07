import { primeFactorization } from '../../utils/index.js'

export const renderPrimeFactorization = number => {
  const result = primeFactorization(number) // 616 => {2: 3, , 7: 1, 11: 1}

  const keys = Object.keys(result)
  const values = Object.values(result)

  const html = `<div>
  ${number} = ${values
    .map((value, i) => `${keys[i]}${value !== 1 ? `<sup>${value}</sup>` : ''}`)
    .join('&times;')}</div>
  `

  return html
}
