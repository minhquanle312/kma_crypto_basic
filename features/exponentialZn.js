'use strict'

// *Tính lũy thừa trong Z[n] a^k mod n => i[] (index), k[i], A[], b[]
export const exponentialZn = (a, k, n) => {
  const bin = k.toString(2)

  const kiList = [
    ...bin
      .split('')
      .reverse()
      .map(i => Number(i)),
    0,
    0,
  ]

  const AList = []
  const bList = []

  let b = 1
  if ((k = 0)) return b

  const t = kiList.length - 1

  let A = a
  AList[0] = A

  if (kiList[0] === 1) bList[0] = b = A

  for (let i = 1; i <= t; i++) {
    A = A ** 2 % n
    AList.push(A)
    if (kiList[i] === 1) b = (A * b) % n
    bList.push(b)
  }

  return { kiList, AList, bList, b }
}

// export const exponentialZn = (a, k, n) => {
//   const result = 0
//   let message

//   const bin = k.toString(2)
//   const binArr = bin
//     .split('')
//     .reverse()
//     .map(item => Number(item))

//   message = `Ta có: ${k} = ${bin} -> ` + messageExponential(a, k)

//   // [1, 0, 0, 1, 0, 1]
//   console.log(binArr)
//   let x, y
//   binArr.forEach((item, i) => {
//     if (i === 0) {
//       message =
//         message +
//         `\n${a}^${2 ** i} mod ${n} = ${a ** (2 ** i)} mod ${n} = ${
//           a ** (2 ** i) % n
//         }`
//     } else if (i === 1) {
//       message =
//         message +
//         `\n${a}^${2 ** i} mod ${n} = ${a ** (2 ** (i - 1)) % n} x ${
//           a ** (2 ** (i - 1)) % n
//         } = ${a ** (2 ** i)} mod ${n} = ${a ** (2 ** i) % n}`
//       x = a ** (2 ** i) % n
//     } else if (i === 2) {
//       message =
//         message +
//         `\n${a}^${2 ** i} mod ${n} = ${a}^${2 ** (i - 1)} x ${a}^${
//           2 ** (i - 1)
//         } = ${a ** (2 ** (i - 1)) % n} x ${
//           a ** (2 ** (i - 1)) % n
//         } mode ${n} =  ${(a ** (2 ** (i - 1)) % n) ** 2 % n}`
//       y = a ** (2 ** i) % n
//     } else {
//       const messageTemp = `\n${a}^${2 ** i} mod ${n} = ${a}^${
//         2 ** (i - 1)
//       } x ${a}^${2 ** (i - 1)} = ${a ** (2 ** (i - 1)) % n} x ${
//         a ** (2 ** (i - 1)) % n
//       } mode ${n} = `
//       i % 2 === 0
//         ? (message = message + messageTemp + `${y}`)
//         : (message = message + messageTemp + `${x}`)
//     }
//   })

//   return message + '\nCÒN HÀNG KẾT LUẬN THÌ TỰ VIẾT'
// }
