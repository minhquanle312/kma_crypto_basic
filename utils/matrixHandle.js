'use strict'

// !WARNING: KHÔNG SỬA KHU VỰC BÊN DƯỚI
// *Source: https://jamesmccaffrey.wordpress.com/2020/04/24/matrix-inverse-with-javascript/
export function reduce(lum, b) {
  // helper
  let n = lum.length
  let x = vecMake(n, 0.0)
  for (let i = 0; i < n; ++i) {
    x[i] = b[i]
  }

  for (let i = 1; i < n; ++i) {
    let sum = x[i]
    for (let j = 0; j < i; ++j) {
      sum -= lum[i][j] * x[j]
    }
    x[i] = sum
  }

  x[n - 1] /= lum[n - 1][n - 1]
  for (let i = n - 2; i >= 0; --i) {
    let sum = x[i]
    for (let j = i + 1; j < n; ++j) {
      sum -= lum[i][j] * x[j]
    }
    x[i] = sum / lum[i][i]
  }

  return x
} // reduce
export function matDecompose(m, lum, perm) {
  // Crout's LU decomposition for matrix determinant and inverse
  // stores combined lower & upper in lum[][]
  // stores row permuations into perm[]
  // returns +1 or -1 according to even or odd perms
  // lower gets dummy 1.0s on diagonal (0.0s above)
  // upper gets lum values on diagonal (0.0s below)

  let toggle = +1 // even (+1) or odd (-1) row permutatuions
  let n = m.length

  // make a copy of m[][] into result lum[][]
  //lum = matMake(n, n, 0.0);
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      lum[i][j] = m[i][j]
    }
  }

  // make perm[]
  //perm = vecMake(n, 0.0);
  for (let i = 0; i < n; ++i) perm[i] = i

  for (let j = 0; j < n - 1; ++j) {
    // note n-1
    let max = Math.abs(lum[j][j])
    let piv = j

    for (let i = j + 1; i < n; ++i) {
      // pivot index
      let xij = Math.abs(lum[i][j])
      if (xij > max) {
        max = xij
        piv = i
      }
    } // i

    if (piv != j) {
      let tmp = lum[piv] // swap rows j, piv
      lum[piv] = lum[j]
      lum[j] = tmp

      let t = perm[piv] // swap perm elements
      perm[piv] = perm[j]
      perm[j] = t

      toggle = -toggle
    }

    let xjj = lum[j][j]
    if (xjj != 0.0) {
      // TODO: fix bad compare here
      for (let i = j + 1; i < n; ++i) {
        let xij = lum[i][j] / xjj
        lum[i][j] = xij
        for (let k = j + 1; k < n; ++k) {
          lum[i][k] -= xij * lum[j][k]
        }
      }
    }
  } // j

  return toggle // for determinant
} // matDecompose
export function vecMake(n, val) {
  let result = []
  for (let i = 0; i < n; ++i) {
    result[i] = val
  }
  return result
}
export function vecInit(s) {
  let vals = s.split(',')
  let result = []
  for (let i = 0; i < vals.length; ++i) {
    result[i] = parseFloat(vals[i])
  }
  return result
}
export function matMake(rows, cols, val) {
  let result = []
  for (let i = 0; i < rows; ++i) {
    result[i] = []
    for (let j = 0; j < cols; ++j) {
      result[i][j] = val
    }
  }
  return result
}
export function matInit(rows, cols, s) {
  // ex: let m = matInit(2, 3, "1,2,3, 4,5,6");
  let result = matMake(rows, cols, 0.0)
  let vals = s.split(',')
  let k = 0
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      result[i][j] = parseFloat(vals[k++])
    }
  }
  return result
}
export function vecShow(v, dec, wid) {
  for (let i = 0; i < v.length; ++i) {
    if (v[i] >= 0.0) {
      let x = v[i]
      if (x < 1.0e-5) x = 0.0 // avoid -0.00 display
      process.stdout.write(' ') // (no auto newline)
    }
    process.stdout.write(x.toFixed(dec).padStart(wid, ' '))
  }
  process.stdout.write('\n')
}
export function matShow(m, dec, wid) {
  let rows = m.length
  let cols = m[0].length
  for (let i = 0; i < rows; ++i) {
    for (let j = 0; j < cols; ++j) {
      let x = m[i][j]
      if (x < 1.0e-5) x = 0.0
      process.stdout.write(x.toFixed(dec).padStart(wid, ' '))
      process.stdout.write('  ')
    }
    process.stdout.write('\n')
  }
}
export function matProduct(ma, mb) {
  let aRows = ma.length
  let aCols = ma[0].length
  let bRows = mb.length
  let bCols = mb[0].length
  if (aCols != bRows) {
    throw 'Non-conformable matrices'
  }

  let result = matMake(aRows, bCols, 0.0)

  for (let i = 0; i < aRows; ++i) {
    // each row of A
    for (let j = 0; j < bCols; ++j) {
      // each col of B
      for (let k = 0; k < aCols; ++k) {
        // could use bRows
        result[i][j] += ma[i][k] * mb[k][j]
      }
    }
  }

  return result
}
// export function matInverse(m)
// {
//   // assumes determinant is not 0
//   // that is, the matrix does have an inverse
//   let n = m.length;
//   let result = matMake(n, n, 0.0); // make a copy
//   for (let i = 0; i < n; ++i) {
//     for (let j = 0; j < n; ++j) {
//       result[i][j] = m[i][j];
//     }
//   }

//   let lum = matMake(n, n, 0.0); // combined lower & upper
//   let perm = vecMake(n, 0.0);  // out parameter
//   matDecompose(m, lum, perm);  // ignore return

//   let b = vecMake(n, 0.0);
//   for (let i = 0; i < n; ++i) {
//     for (let j = 0; j < n; ++j) {
//       if (i == perm[j])
//         b[j] = 1.0;
//       else
//         b[j] = 0.0;
//     }

//     let x = reduce(lum, b); //
//     for (let j = 0; j < n; ++j)
//       result[j][i] = x[j];
//   }
//   return result;
// }
export function matDeterminant(m) {
  let n = m.length
  let lum = matMake(n, n, 0.0)
  let perm = vecMake(n, 0.0)
  let result = matDecompose(m, lum, perm) // -1 or +1
  for (let i = 0; i < n; ++i) result *= lum[i][i]
  return result
}
// !KHÔNG SỬA BÊN TRÊN

// ********** MATRIX ****************
// *Nhân 2 ma trận
export const multiplyMatrices = (A, B) =>
  A.map((row, i) =>
    B[0].map((_, j) => row.reduce((acc, _, n) => acc + A[i][n] * B[n][j], 0))
  )

// *Chuyển ma trận về Z[n] mặc định n = 26
export const matrixInZn = (matrix, n = 26) => {
  const result = []
  for (const row of matrix) {
    result.push(row.map(item => item % n))
  }
  return result
}

// console.table(matrixInZn([[159, 212]]))

// * Nhân ma trận với 1 số
export const multiplyMatrixNumber = (number, matrix) => {
  const result = []
  for (const row of matrix) {
    result.push(row.map(item => Math.round(number * item)))
  }
  return result
}

// *Tính định thức ma trận
export const det = m =>
  m.length == 1
    ? m[0][0]
    : m.length == 2
    ? m[0][0] * m[1][1] - m[0][1] * m[1][0]
    : m[0].reduce(
        (r, e, i) =>
          r +
          (-1) ** (i + 2) *
            e *
            det(m.slice(1).map(c => c.filter((_, j) => i != j))),
        0
      )

// * Ma trận nghịch đảo
export const matInverse = m => {
  // assumes determinant is not 0
  // that is, the matrix does have an inverse
  let n = m.length
  let result = matMake(n, n, 0.0) // make a copy
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      result[i][j] = m[i][j]
    }
  }

  let lum = matMake(n, n, 0.0) // combined lower & upper
  let perm = vecMake(n, 0.0) // out parameter
  matDecompose(m, lum, perm) // ignore return

  let b = vecMake(n, 0.0)
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (i == perm[j]) b[j] = 1.0
      else b[j] = 0.0
    }

    let x = reduce(lum, b) //
    for (let j = 0; j < n; ++j) result[j][i] = x[j]
  }
  return result
}
