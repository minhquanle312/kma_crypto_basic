'use strict'
/*
 * @author: Minh Quân Lê
 */

import {
  renderBlock,
  renderEncodeVigenere,
  renderDecodeVigenere,
} from './components/index.js'

const loggerEncode2 = function (params) {
  console.log('encode logger 2')
}
const loggerEncode3 = function (params) {
  console.log('encode logger 3')
}

const loggerDecode = function (params) {
  console.log('decode logger 1')
}
const loggerDecode2 = function (params) {
  console.log('decode logger 2')
}
const loggerDecode3 = function (params) {
  console.log('decode logger 3')
}

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
  'nav__list--math',
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
  loggerEncode2,
  loggerDecode2
)

renderBlock(
  'nav__list--math',
  { 'crypto-des': 'Mật mã DES' },
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
// console.log(findSRTinZ(4864, 3458))

// ==============================
// TODO:Giải phương trình đồng dư
// console.log(congruenceEquation(6, 27, 33))

// ==============================
// TODO:Tính ø Euler
// console.log(calcEuler(616))

// TODO:Căn nguyên thủy: primitive root => danh sách các căn nguyên thủy của p
// console.log(primitiveRoot(19))

// TODO:Tìm x trong miền Z[n]: tính nghịch đảo trong Z[n]
// console.log(calcInverseZn(23, 100))

// TODO:Tính lũy thừa trong Z[n]: (a, k, n) input: a^k mod n
// console.log(exponentialZn(9, 73, 13))

// ***************PHẦN MẬT MÃ
// TODO: Mã hóa Hill
// console.log(decodeHill('eodvvd', 'rrfvsvcct'))
// console.log(decodeHill('FWTVSVJXBKNKGVAEDMWXOGJUGCD', 'neverquit'))
// console.log(encodeHill('hocvienhocvienmatmahochimin', 'neverquit'))

// TODO: DES
// console.log(findKeyDES('AT150739'))
