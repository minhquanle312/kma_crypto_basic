import { calcEuler } from '../../features/index.js'
import { primeFactorization } from '../../utils/index.js'
import { renderPrimeFactorization } from './primeFactorization.js'

export const renderEuler = number => {
  const result = calcEuler(number)
  const prime = renderPrimeFactorization(number)
  const primeObj = primeFactorization(number)
  const stringList = []
  for (const [key, value] of Object.entries(primeObj)) {
    stringList.push(`(1 - <sup>1</sup>&frasl;<sub>${key}</sub>)`)
  }

  const html = `<div>
  <p>${prime}</p> &rarr; &empty;(${number}) = ${number}${stringList
    .map(item => item)
    .join('')} = ${result}
  </div>
  `

  return html
}
