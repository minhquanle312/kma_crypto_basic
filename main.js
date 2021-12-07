'use strict'
/*
 * @author: Minh Quân Lê
 */

console.log('NHỚ BẤM CLEAR SAU MỖI LẦN DÙNG CHO DỄ NHÌN')

import {
  calcEuler,
  calcInverseZn,
  congruenceEquation,
  exponentialZn,
  findSRTinZ,
  primitiveRoot,
  encodeHill,
  decodeHill,
  findKeyDES,
  encodeVigenere,
} from '../features/index.js'
import {
  matDecompose,
  vecMake,
  vecInit,
  matMake,
  matInit,
  vecShow,
  matShow,
  matProduct,
  matDeterminant,
  multiplyMatrices,
  matrixInZn,
  multiplyMatrixNumber,
  matInverse,
  reduce,
  det,
  gcd,
  calcPrimeFactorization,
  numberPrimeFactorization,
  messagePrimeFactorization,
  messageExponential,
  encodeChar,
  asciiToHex,
  hexToBin,
  primeNumbers,
  ALPHABET_CODE,
} from '../utils/index.js'

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const btnSection1 = $('.section-1__btn')
const btnSection2 = $('.section-2__btn')

// *Header handler
const sidebarToggle = $('.sidebar-toggle')
const btnSidebar = $$('.header__icon')
btnSidebar.forEach(item => {
  item.addEventListener('click', function (e) {
    sidebarToggle.classList.toggle('active')
  })
})

// *Hill handler
const hillEncodePlaintext = $('#hill-encode-plaintext')
const hillEncodeKey = $('#hill-encode-key')
const hillDecodePlaintext = $('#hill-decode-plaintext')
const hillDecodeKey = $('#hill-decode-key')

btnSection1.addEventListener('click', function (e) {
  const result = encodeHill(hillEncodePlaintext.value, hillEncodeKey.value)
  console.log(result)
})

btnSection2.addEventListener('click', function (e) {
  const result = decodeHill(hillDecodePlaintext.value, hillDecodeKey.value)
  console.log(result)
})

// *Vigenere handler
const vigenereEncodePlaintext = $('#vigenere-encode-plaintext')
const vigenereEncodeKey = $('#vigenere-encode-key')
const btnSection3 = $('.section-3__btn')

btnSection3.addEventListener('click', function (e) {
  const result = encodeVigenere(
    vigenereEncodePlaintext.value,
    vigenereEncodeKey.value
  )
  console.log(result)
})

// *DES
const desKey = $('#des-key')
const btnSection4 = $('.section-4__btn')

btnSection4.addEventListener('click', function (e) {
  const result = findKeyDES(desKey.value)
  console.log(result)
})

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
console.log(primitiveRoot(19))

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
