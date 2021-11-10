'use strict'

/*
 * @author: Minh Quân Lê
 */

// GLOBAL VARIABLES
const primeNumbers = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151,
  157, 167, 173, 179, 181, 191, 193, 199, 202, 203, 207, 211, 227, 233, 239,
  251, 257, 263, 269, 281, 293, 307, 311, 317, 337, 347, 353, 359, 379, 389,
  401, 409, 419, 431, 443, 449, 461, 467, 479, 487, 491, 499, 503,
]

const ALPHABET_CODE = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
  8: 'I',
  9: 'J',
  10: 'K',
  11: 'L',
  12: 'M',
  13: 'N',
  14: 'O',
  15: 'P',
  16: 'Q',
  17: 'R',
  18: 'S',
  19: 'T',
  20: 'U',
  21: 'V',
  22: 'W',
  23: 'X',
  24: 'Y',
  25: 'Z',
}
// =======================
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !WARNING: KHÔNG SỬA KHU VỰC BÊN DƯỚI
// *Source: https://jamesmccaffrey.wordpress.com/2020/04/24/matrix-inverse-with-javascript/
function reduce(lum, b) {
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
function matDecompose(m, lum, perm) {
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
function vecMake(n, val) {
  let result = []
  for (let i = 0; i < n; ++i) {
    result[i] = val
  }
  return result
}
function vecInit(s) {
  let vals = s.split(',')
  let result = []
  for (let i = 0; i < vals.length; ++i) {
    result[i] = parseFloat(vals[i])
  }
  return result
}
function matMake(rows, cols, val) {
  let result = []
  for (let i = 0; i < rows; ++i) {
    result[i] = []
    for (let j = 0; j < cols; ++j) {
      result[i][j] = val
    }
  }
  return result
}
function matInit(rows, cols, s) {
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
function vecShow(v, dec, wid) {
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
function matShow(m, dec, wid) {
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
function matProduct(ma, mb) {
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
// function matInverse(m)
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
function matDeterminant(m) {
  let n = m.length
  let lum = matMake(n, n, 0.0)
  let perm = vecMake(n, 0.0)
  let result = matDecompose(m, lum, perm) // -1 or +1
  for (let i = 0; i < n; ++i) result *= lum[i][i]
  return result
}
// !WARNING: KHÔNG SỬA BÊN TRÊN
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// GLOBAL FUNCTION
// ********** MATRIX ****************
// *Nhân 2 ma trận
const multiplyMatrices = (A, B) =>
  A.map((row, i) =>
    B[0].map((_, j) => row.reduce((acc, _, n) => acc + A[i][n] * B[n][j], 0))
  )

// *Chuyển ma trận về Z[n] mặc định n = 26
const matrixInZn = (matrix, n = 26) => {
  const result = []
  for (const row of matrix) {
    result.push(row.map((item) => item % n))
  }
  return result
}

// console.table(matrixInZn([[159, 212]]))

// * Nhân ma trận với 1 số
const multiplyMatrixNumber = (number, matrix) => {
  const result = []
  for (const row of matrix) {
    result.push(row.map((item) => Math.round(number * item)))
  }
  return result
}

// *Tính định thức ma trận
const det = (m) =>
  m.length == 1
    ? m[0][0]
    : m.length == 2
    ? m[0][0] * m[1][1] - m[0][1] * m[1][0]
    : m[0].reduce(
        (r, e, i) =>
          r +
          (-1) ** (i + 2) *
            e *
            det(m.slice(1).map((c) => c.filter((_, j) => i != j))),
        0
      )

// * Ma trận nghịch đảo
const matInverse = (m) => {
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
// ! THUẬT TOÁN VỚI MA TRẬN BÊN TRÊN

// ***********************************
// *Tìm UCLN: greatest common divisor
const gcd = (...arr) => {
  const _gcd = (x, y) => (!y ? x : gcd(y, x % y))
  return [...arr].reduce((a, b) => _gcd(a, b))
}

// *Phân tích thừa số nguyên tố: trả về mảng là các số mũ ở vị trí số nguyên tố tương ứng trong mảng Prime Number
const calcPrimeFactorization = (number) => {
  const result = []
  let i = 0
  for (const item of primeNumbers) {
    while (number % item === 0) {
      number = number / item
      i++
    }
    result.push(i)
    i = 0

    if (number === 1) break
  }
  return result
}

// *Phân tích thừa số nguyên tố (vd: 200 = 2^3x5^2 => return [2, 5]): trả về mảng là các số nguyên tố
const numberPrimeFactorization = (arrayPrimeFactorization) => {
  const result = []
  arrayPrimeFactorization.forEach(
    (number, i) => number !== 0 && result.push(primeNumbers[i])
  )
  return result
}

// *Phân tích thừa số nguyên tố thành chuỗi: nhận vào mảng calcPrimeFactorization return chuỗi
const messagePrimeFactorization = (arrayPrimeFactorization) => {
  let message = ' '
  arrayPrimeFactorization.forEach((number, i) => {
    if (number !== 0) {
      message =
        message +
        `${message.slice(-1) === ' ' ? '' : 'x'}` +
        `${primeNumbers[i]}${number === 1 ? '' : `^${number}`}`
    }
  })
  return message
}

// *Input(a, b) <=> a^b EX: 5^41 = 5^32x5^8x5^1
const messageExponential = (a, b) => {
  const arr = b
    .toString(2)
    .split('')
    .reverse()
    .map((item) => Number(item))

  let message = `${a}^${b} = `

  arr.forEach((num, i) => {
    if (arr[i] !== 0)
      message =
        message + `${message.slice(-1) === ' ' ? '' : 'x'}` + `${a}^${2 ** i}`
  })

  return message
}

// =======================
// *FUNCTION IN USE
// *Tính ø Euler
const calcEuler = (a) => {
  const b = a
  let result = a

  const primeList = calcPrimeFactorization(a)
  // console.log(primeList)

  let message =
    `Vì ${b} = ` + messagePrimeFactorization(primeList) + `-> ø(${b}) = ${b}`

  primeList.forEach((number, i) => {
    if (number !== 0) {
      result *= 1 - 1 / primeNumbers[i]
      message = message + `(1 - 1/${primeNumbers[i]})`
    }
  })

  return message + ' = ' + Math.trunc(result)
}

// *Tìm s, r, t trong miền Z
const findSAndTInZ = (a, b) => {
  const arr1 = [new Array(10)]

  let r1 = a
  let r2 = b
  let s1 = 1
  let s2 = 0
  let t1 = 0
  let t2 = 1
  let q, r, s, t

  arr1[0][1] = r1
  arr1[0][2] = r2
  arr1[0][4] = s1
  arr1[0][5] = s2
  arr1[0][7] = t1
  arr1[0][8] = t2

  let i = 1

  while (r2 > 0) {
    arr1.push(new Array(10))

    q = Math.trunc(r1 / r2)
    arr1[i - 1][0] = q

    // Updating r's
    r = r1 % r2
    arr1[i - 1][3] = r
    r1 = r2
    r2 = r
    // Updating s's
    s = s1 - q * s2
    arr1[i - 1][6] = s
    s1 = s2
    s2 = s
    // Updating r's
    t = t1 - q * t2
    arr1[i - 1][9] = t
    t1 = t2
    t2 = t

    arr1[i][1] = r1
    arr1[i][2] = r2
    arr1[i][4] = s1
    arr1[i][5] = s2
    arr1[i][7] = t1
    arr1[i][8] = t2

    i += 1
  }
  arr1[i - 1][0] = Math.trunc(arr1[i - 2][1] / arr1[i - 2][2])

  arr1[i - 1][3] = arr1[i - 2][1] % arr1[i - 2][2]

  arr1[i - 1][6] = arr1[i - 2][4] - arr1[i - 2][0] * arr1[i - 2][5]

  arr1[i - 1][9] = arr1[i - 2][7] - arr1[i - 2][0] * arr1[i - 2][8]

  let message = `
    ${['q', 'r1', 'r2', 'r', 's1', 's2', 's', 't1', 't2', 't']
      .map((item) => String(item).padStart(4, ' ').padStart(4, ' '))
      .join(' ')}
    `
  for (const i of arr1) {
    message += `
    ${i.map((item) => String(item).padStart(4, ' ').padStart(4, ' ')).join(' ')}
      `
  }
  return message + `r: ${r1}, s: ${s1}, t: ${t1}`
}

// *Tìm x trong miền Z[n]: tính nghịch đảo trong Z[n]
const calcInverseInZn = (b, n) => {
  const arr1 = [new Array(7)]

  let r1 = n
  let r2 = b
  let t1 = 0
  let t2 = 1
  let q, r, t

  arr1[0][1] = r1
  arr1[0][2] = r2
  arr1[0][4] = t1
  arr1[0][5] = t2

  let i = 1

  while (r2 > 0) {
    arr1.push(new Array(7))

    q = Math.trunc(r1 / r2)
    arr1[i - 1][0] = q

    // Updating r's
    r = r1 % r2
    arr1[i - 1][3] = r
    r1 = r2
    r2 = r
    // Updating r's
    t = t1 - q * t2
    arr1[i - 1][6] = t
    t1 = t2
    t2 = t

    arr1[i][1] = r1
    arr1[i][2] = r2
    arr1[i][4] = t1
    arr1[i][5] = t2

    i += 1
  }

  let x // x <=> b^(-1)
  if (r1 === 1) x = t1

  arr1[i - 1][0] = undefined
  arr1[i - 1][3] = undefined
  arr1[i - 1][6] = undefined

  let message = `
    ${['q', 'r1', 'r2', 'r', 't1', 't2', 't']
      .map((item) => String(item).padStart(4, ' ').padStart(4, ' '))
      .join(' ')}
    `

  for (const i of arr1) {
    message += `
    ${i
      .map((item) =>
        String(item) === 'undefined'
          ? 'x'.padStart(4, ' ').padStart(4, ' ')
          : String(item).padStart(4, ' ').padStart(4, ' ')
      )
      .join(' ')}
      `
  }
  return message + `\n\tx = ${x} = ${n} - ${-x} = ${n + x}`
}

// *Phương trình đồng dư: congruence equation
const congruenceEquation = (a, b, n) => {
  const d = gcd(a, n)
  let x, message
  const arr = Array.from({ length: n }, (_, i) => i)

  if (b % d !== 0) {
    return `d = (a, n) = (${a}, ${n}) = ${d} không phải là ước của ${b} bên phương trình vô nghiệm`
  }

  let i = 0
  while ((arr[i] * a) % n !== b % n) {
    x = arr[i + 1]
    i++
  }

  message = `d = (a, n) = (${a}, ${n}) = ${d} | ${b} -> phương trình có ${d} nghiệm
  Phần dư đầy đủ không âm nhỏ nhất của modulo ${n} là:
  ${arr.join(' ')}
  Giá trị thỏa phương trình là x0 = ${x}
  Phương trình có ${d} nghiệm là:
  `

  for (let i = 0; i < d; i++) {
    const equation = `
    x = ${x} + ${i}*(${n}/${d}) (mod ${n}) <=> x = ${
      (x + i * (n / d)) % n
    } (mod ${n})
    `
    message += equation
  }

  return message
}

// *Căn nguyên thủy: primitive root => danh sách các căn nguyên thủy của p
const primitiveRoot = (p) => {
  let arr2 = []
  const q = p - 1
  const gArr = Array.from({ length: p }, (_, i) => i).slice(2)

  const arr = calcPrimeFactorization(q)
  const primeStr = messagePrimeFactorization(arr)
  const primeNum = numberPrimeFactorization(arr)

  let message = `q = ${q} = ${primeStr} -> `
  for (let i = 0; i < primeNum.length; i++) {
    message += `p${i} = ${primeNum[i]}, `
    arr2.push(q / primeNum[i])
  }

  message += `
  g ⋲ {${gArr.join(', ')}}`

  const list = []
  for (const g of gArr) {
    let flag = true

    message += `
    g = ${g}`

    for (const [index, pi] of Object.entries(primeNum)) {
      message += `
      p${Number(index) + 1} = ${pi}: g^(q/p${Number(index) + 1}) mod p = ${g}^${
        arr2[index]
      } mod ${p} = ${g ** arr2[index] % p}`

      if (g ** (q / pi) % p === 1) {
        message += ` = 1 -> loại`
        flag = false
        break
      } else {
        message += ' != 1'
      }
    }

    if (flag) list.push(g)
  }
  // console.log(list)
  return (message += `

  Vậy ${list.join(', ')} là các căn nguyên thủy của ${p}`)
}

// *Tính lũy thừa trong Z[n]
const exponentialInZn = (a, k, n) => {
  const result = 0
  let message

  const bin = k.toString(2)
  const binArr = bin
    .split('')
    .reverse()
    .map((item) => Number(item))

  message = `Ta có: ${k} = ${bin} -> ` + messageExponential(a, k)

  // [1, 0, 0, 1, 0, 1]
  console.log(binArr)
  let x, y
  binArr.forEach((item, i) => {
    if (i === 0) {
      message =
        message +
        `\n${a}^${2 ** i} mod ${n} = ${a ** (2 ** i)} mod ${n} = ${
          a ** (2 ** i) % n
        }`
    } else if (i === 1) {
      message =
        message +
        `\n${a}^${2 ** i} mod ${n} = ${a ** (2 ** (i - 1)) % n} x ${
          a ** (2 ** (i - 1)) % n
        } = ${a ** (2 ** i)} mod ${n} = ${a ** (2 ** i) % n}`
      x = a ** (2 ** i) % n
    } else if (i === 2) {
      message =
        message +
        `\n${a}^${2 ** i} mod ${n} = ${a}^${2 ** (i - 1)} x ${a}^${
          2 ** (i - 1)
        } = ${a ** (2 ** (i - 1)) % n} x ${
          a ** (2 ** (i - 1)) % n
        } mode ${n} =  ${(a ** (2 ** (i - 1)) % n) ** 2 % n}`
      y = a ** (2 ** i) % n
    } else {
      const messageTemp = `\n${a}^${2 ** i} mod ${n} = ${a}^${
        2 ** (i - 1)
      } x ${a}^${2 ** (i - 1)} = ${a ** (2 ** (i - 1)) % n} x ${
        a ** (2 ** (i - 1)) % n
      } mode ${n} = `
      i % 2 === 0
        ? (message = message + messageTemp + `${y}`)
        : (message = message + messageTemp + `${x}`)
    }
  })

  return message + '\nCÒN HÀNG KẾT LUẬN THÌ TỰ VIẾT'
}

// * Chuyển từ ký tự sang số
const encodeChar = (plaintext) => {
  const code = plaintext
    .toUpperCase()
    .split('')
    .map((val) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [code, char] of Object.entries(ALPHABET_CODE)) {
        if (val === char) return code
      }
    })
    .join(', ')
  return code
}

// * Mã hóa Hill
const encodeHill = (plaintext, k, op = true, k_1 = false, isDecode = false) => {
  let opening = `Ta thấy rằng ma trận có cỡ ${k.length}x${k.length} nên bản rõ sẽ được chia thành các phần tử, mỗi phần tử chứa ${k.length} ký tự:`

  let message
  if (op) message += opening
  plaintext = plaintext.toUpperCase()

  const wordArr = []
  for (let i = 0; i < plaintext.length; ) {
    wordArr.push(plaintext.slice(i, i + k.length))
    i += k.length
  }

  const hillCode = [...wordArr].map((word) =>
    word
      .split('')
      .map((val) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [code, char] of Object.entries(ALPHABET_CODE)) {
          if (val === char) return code
        }
      })
      .join(' ')
  )

  const encode = []
  for (let i = 0; i < wordArr.length; i++) {
    const subArr = [[...hillCode[i].split(' ')].map((item) => Number(item))]
    let encodeNumber = matrixInZn(multiplyMatrices(subArr, k))
    let decodeChar = encodeNumber[0].map((char) => ALPHABET_CODE[char]).join('')
    encode.push(decodeChar)

    message += `\n'${wordArr[i]}' <=> (${hillCode[i]
      .split(' ')
      .join(', ')}) x ${
      k_1 === true ? 'k^(-1)' : 'k'
    } = (${encodeNumber}) => ${decodeChar}`
  }

  return (
    message + `\nBản ${isDecode === true ? 'rõ' : 'mã'} là: ${encode.join('')}`
  )
}

const decodeHill = (plaintext, k) => {
  let detK = det(k)

  console.log(detK)

  // !FIXME: ĐỔI detK VỀ Z[26], BIỆN PHÁP TẠM THỜI, sau phải tách ra hàm riêng để tái sử dụng
  // ! Còn trường hợp detK = 0 chưa biết nên chưa làm, ai có ý kiến thì contribute giúp
  // if (detK > 0) detK = detK % 26
  // else if (detK < 0) {
  //   const temp = Math.ceil(Math.abs(detK) / 26)
  //   detK = (26 * temp) % detK
  // }

  const isInvertible = gcd(26, detK) === 1 ? true : false

  console.log('matrix inverse: ', multiplyMatrixNumber(det(k), matInverse(k)))

  // const kMinus1Temp = matrixInZn(multiplyMatrixNumber(det(k), matInverse(k)))
  const kMinus1Temp = matrixInZn(multiplyMatrixNumber(det(k), matInverse(k)))
  const kMinus1 = []
  for (const row of kMinus1Temp) {
    kMinus1.push(row.map((item) => (item < 0 ? item + 26 : item)))
  }

  console.log(kMinus1)

  let message = `k^(-1) = `
  for (const row of kMinus1) {
    message += `${row.join('   ')}\n\t\t`
  }

  // console.log(kMinus1)
  // console.log(matrixInZn(kMinus1))

  message += `\ndet(k) = ${detK}; UCLN(26, det(k)) = ${gcd(26, detK)}`

  if (!isInvertible)
    return (
      message +
      `\nUCLN(26, det(k)) = ${gcd(26, detK)} != 1 nên ma trận không khả nghịch`
    )
  message += `\nVậy k khả nghịch trên Z[26]`

  message += `\n${encodeHill(plaintext, kMinus1, false, true, true)}`

  return message
}

// * Mã hóa DES
const asciiToHex = (str) => {
  var arr1 = []
  for (var n = 0, l = str.length; n < l; n++) {
    var hex = Number(str.charCodeAt(n)).toString(16)
    arr1.push(hex)
  }
  return arr1.join('')
}

// console.log(asciiToHex('AT150739'))
// 4154313530373339
// 41 54 31 35 30 37 33 39

const hexToBin = (hex) => {
  return parseInt(hex, 16).toString(2).padStart(8, '0')
}

// console.log(asciiToHex('NEVRQUIT'))
// Chỉ đúng với 2 ký tự
// console.log(hexToBin('4E'))

// var result = ''
// '21 23 00 6A D0 0F 69 4C E1 20'.split(' ').forEach(str => {
//   result += hexToBin(str)
// })
// console.log(result)
var result = ''
'41 54 31 35 30 37 33 39'.split(' ').forEach((str) => {
  result += hexToBin(str)
})
// console.log(result)

// 0100 0001 0101 0100 0011 0001 0011 0101 0011 0000 0011 0111 0011 0011 0011 1001

// !===========================
// !===========================
// TODO:PHẦN NÀY NHẬP INPUT VÔ, BỎ COMMENT ĐỂ CHẠY

// CÁC HÀM TÍNH TOÁN
// ==============================
// TODO:Tìm UCLN: greatest common divisor
// console.log(gcd(6, 15))
// TODO:Phân tích thừa số nguyên tố => trả về mảng là các số mũ ở vị trí số nguyên tố tương ứng trong mảng Prime Number
// NOTE: Kết hợp với 1 trong 2 hàm bên dưới
// console.log(calcPrimeFactorization(616))

// TODO: Phân tích thừa số nguyên tố (vd: 200 = 2^3x5^2 => return [2, 5]): trả về mảng là các số nguyên tố
// console.log(numberPrimeFactorization(calcPrimeFactorization(616)))

// TODO:Phân tích thừa số nguyên tố thành chuỗi (vd: 200 = 2^3x5^2): nhận mảng của hàm bên trên
// console.log(messagePrimeFactorization(calcPrimeFactorization(616)))

// ********* MATRIX *************
// TODO: Nhân 2 ma trận
// console.table(
//   multiplyMatrices(
//     // array 1
//     [[9, 20]],
//     // array 2
//     [
//       [11, 8],
//       [3, 7],
//     ]
//   )
// )

// TODO: Tính định thức ma trận
// console.log(
//   det([
//     [4, 14, 3],
//     [21, 21, 3],
//   ])
// )

// **************GIẢI BÀI TẬP: PHẦN TOÁN
// ==============================
// TODO:Tìm s, r, t: input(a, b)
// console.log(findSAndTInZ(4864, 3458))

// ==============================
// TODO:Giải phương trình đồng dư
// console.log(congruenceEquation(6, 27, 33))

// ==============================
// TODO:Tính ø Euler
// console.log(calcEuler(616))

// TODO:Căn nguyên thủy: primitive root => danh sách các căn nguyên thủy của p
// console.log(primitiveRoot(19))

// TODO:Tìm x trong miền Z[n]: tính nghịch đảo trong Z[n]
// console.log(calcInverseInZn(23, 100))

// TODO:Tính lũy thừa trong Z[n]: (a, k, n) input: a^k mod n
// console.log(exponentialInZn(9, 73, 13))

// ***************PHẦN MẬT MÃ
// TODO: Mã hóa Hill
// ! Nếu key là string thì dùng hàm này trước để tìm ma trận: string => Z[26]
console.log(encodeChar('NEVERQUIT'))

console.log(
  encodeHill('HOCVIENHOCVIENMATMAHOCHIMIN', [
    [13, 4, 21],
    [4, 17, 16],
    [20, 8, 19],
  ])
)

// FWTVSVJXBKNKGVAEDMWXOGJUGCD
console.log(
  encodeHill('MONDAY', [
    [17, 17, 5],
    [21, 18, 21],
    [2, 2, 19],
  ])
)
// console.log(
//   encodeHill('July', [
//     [11, 8],
//     [3, 7],
//   ])
// )

// TODO: Giải mã Hill
console.log(
  decodeHill('EODVVD', [
    [17, 17, 5],
    [21, 18, 21],
    [2, 2, 19],
  ])
)
console.log(
  decodeHill('FWTVSVJXBKNKGVAEDMWXOGJUGCD', [
    [13, 4, 21],
    [4, 17, 16],
    [20, 8, 19],
  ])
)

console.log(
  decodeHill('delw', [
    [11, 8],
    [3, 7],
  ])
)
