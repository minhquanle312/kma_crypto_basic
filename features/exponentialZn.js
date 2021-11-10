'use strict'

import { messageExponential } from '../utils/index.js'
// *Tính lũy thừa trong Z[n]
export const exponentialZn = (a, k, n) => {
  const result = 0
  let message

  const bin = k.toString(2)
  const binArr = bin
    .split('')
    .reverse()
    .map(item => Number(item))

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
