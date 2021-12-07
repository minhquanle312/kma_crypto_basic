import { gcd } from '../../utils/index.js'

export const renderGCD = numbers => {
  const result = gcd(...numbers.split(','))
  return `Ước chung lớn nhất là: ${result}`
}
