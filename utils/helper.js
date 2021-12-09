import { squareNumbers } from './index.js'

// *mảng thành ma trận vuông bậc 'degree'
export const arrayToMatrix = (arr, degree = 0) => {
  const matrix = []
  const length = arr.length

  if (degree === 0) {
    if (!squareNumbers.includes(length) || length === 0 || length === 1)
      return []

    degree = Math.sqrt(length)
  }

  for (let i = 0; i < length; ) {
    matrix.push(arr.slice(i, i + degree))
    i += degree
  }

  return matrix
}
