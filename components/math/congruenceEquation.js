import { congruenceEquation } from '../../features/index.js'
import { gcd } from '../../utils/index.js'

export const renderCongruenceEquation = (a, b, n) => {
  const result = congruenceEquation(a, b, n)

  const { d, arr, x } = result
  if (d === undefined)
    return `d = (a, n) = (${a}, ${n}) = ${gcd(
      a,
      n
    )} không phải là ước của ${b} bên phương trình vô nghiệm`

  const stringList = []
  for (let i = 0; i < d; i++) {
    stringList.push(`
    x = ${x} + ${i}*(<sup>${n}</sup>&frasl;<sub>${d}</sub>) (mod ${n}) <=> x = ${
      (x + i * (n / d)) % n
    } (mod ${n})
    `)
  }
  const html = `<div>
    <p>d = (a, n) = (${a}, ${n}) = ${d} | ${b} &rarr; phương trình có ${d} nghiệm
    <p>Phần dư đầy đủ không âm nhỏ nhất của modulo ${n} là:</p>
    ${arr.join(', ')}
    <p>Giá trị thỏa phương trình là x<sub>0</sub> = ${x}, phương trình có ${d} nghiệm là:</p></p>
    <p>${stringList.map(item => item).join('<br>')}</p>
  </div>
  `

  return html
}
