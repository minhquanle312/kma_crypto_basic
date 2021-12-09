'use strict'
/*
 * @author: Minh Quân Lê
 */

import {
  renderBlock,
  renderEncodeVigenere,
  renderDecodeVigenere,
  renderPrimeFactorization,
  renderGCD,
  renderSRTinZ,
  renderCongruenceEquation,
  renderEuler,
  renderPrimitiveRoot,
  renderDiscreteLogarithm,
  renderInverseZn,
  renderExponentialZn,
  renderEncodeHill,
  renderDecodeHill,
} from './components/index.js'

const loggerEncode3 = function (params) {
  console.log('encode logger 3')
}
const loggerDecode3 = function (params) {
  console.log('decode logger 3')
}

// *RENDER MATH
renderBlock(
  'nav__list--math',
  { 'basic-math': 'Ước chung lớn nhất, Euler, phân tích thừa số nguyên tố' },
  {
    gcd: {
      text: 'Tìm ước chung lớn nhất',
      input: {
        number: 'Nhập các số cần tìm (VD: 1, 2, ...)',
      },
    },
    euler: {
      text: 'Tính Euler',
      input: {
        a: 'Nhập a',
      },
    },
    primeFactorization: {
      text: 'Tìm thừa số nguyên tố',
      input: {
        number: 'Số cần tìm',
      },
    },
  },
  renderGCD,
  renderEuler,
  renderPrimeFactorization
)

renderBlock(
  'nav__list--math',
  { 'find-srt': 'Tìm s, r, t của a, b trong Z' },
  {
    primeFactorization: {
      text: 'Tìm s, r, t',
      input: {
        a: 'Nhập a',
        b: 'Nhập b',
      },
    },
  },
  renderSRTinZ
)

renderBlock(
  'nav__list--math',
  { 'congruence-equation': 'Phương trình đồng dư' },
  {
    primeFactorization: {
      text: 'Phương trình đồng dư ax = b (mod n)',
      input: {
        a: 'Nhập a',
        b: 'Nhập b',
        n: 'Nhập n',
      },
    },
  },
  renderCongruenceEquation
)

renderBlock(
  'nav__list--math',
  { 'primitive-root': 'Tìm căn nguyên thủy' },
  {
    primitiveRoot: {
      text: 'Căn nguyên thủy của p',
      input: {
        p: 'Nhập p',
      },
    },
    discreteLogarithm: {
      text: 'Logarithm rời rạc trong Z[p]',
      input: {
        r: 'Nhập r (r là căn nguyên thủy của p)',
        p: 'Nhập p',
      },
    },
  },
  renderPrimitiveRoot,
  renderDiscreteLogarithm
)

renderBlock(
  'nav__list--math',
  { 'inverse-Zn': 'Tìm nghịch đảo trong Z<sub>n</sub>' },
  {
    inverseZn: {
      text: 'Tìm nghịch đảo x = b<sup>-1</sup> trong Z<sub>n</sub>',
      input: {
        b: 'Nhập b',
        n: 'Nhập n',
      },
    },
  },
  renderInverseZn
)

renderBlock(
  'nav__list--math',
  { 'exponential-Zn': 'Tính lũy thừa trong Z<sub>n</sub>' },
  {
    exponentialZn: {
      text: 'Tính a<sup>k</sup> mod n',
      input: {
        a: 'Nhập a (a &isin; Z<sup>n</sup>)',
        k: 'Nhập k',
        n: 'Nhập n',
      },
    },
  },
  renderExponentialZn
)

// *Render crypto
renderBlock(
  'nav__list--crypto',
  { 'crypto-vigenere': 'Mật mã Vigenere' },
  {
    encode: {
      text: 'Mã hóa Vigenere',
      input: {
        plaintext: 'Bản rõ',
        key: 'Khóa',
      },
    },
    decode: {
      text: 'Giải mã Vigenere',
      input: {
        cyphertext: 'Bản mã',
        key: 'Khóa',
      },
    },
  },
  renderEncodeVigenere,
  renderDecodeVigenere
)

renderBlock(
  'nav__list--crypto',
  { 'crypto-hill': 'Mật mã Hill' },
  {
    encode: {
      text: 'Mã hóa Hill',
      input: {
        plaintext: 'Bản rõ',
        key: 'Khóa',
      },
    },
    decode: {
      text: 'Giải mã Hill',
      input: {
        cyphertext: 'Bản mã',
        key: 'Khóa',
      },
    },
  },
  renderEncodeHill,
  renderDecodeHill
)

renderBlock(
  'nav__list--crypto',
  { 'crypto-des': 'Mật mã DES (💥đang phát triển)' },
  {
    encode: {
      text: 'Mã hóa DES',
      input: {
        plaintext: 'Bản rõ',
        key: 'Khóa',
      },
    },
    decode: {
      text: 'Giải mã DES',
      input: {
        cyphertext: 'Bản mã',
        key: 'Khóa',
      },
    },
  },
  loggerEncode3,
  loggerDecode3
)
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

// ***************PHẦN MẬT MÃ
// TODO: Mã hóa Hill
// console.log(decodeHill('eodvvd', 'rrfvsvcct'))
// console.log(decodeHill('FWTVSVJXBKNKGVAEDMWXOGJUGCD', 'neverquit'))
// console.log(encodeHill('hocvienhocvienmatmahochimin', 'neverquit'))

// TODO: DES
// console.log(findKeyDES('AT150739'))
