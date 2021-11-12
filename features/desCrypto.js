'use strict'

import { asciiToHex, hexToBin } from '../utils/index.js'
// * Mã hóa DES

export const findKeyDES = key => {
  let hexString = asciiToHex(key)
  let message = `Khóa k sau khi chuyển sang Hexa k = ${hexString}`

  const wordArr = []
  for (let i = 0; i < hexString.length; ) {
    wordArr.push(hexString.slice(i, i + 2))
    i += 2
  }

  let binString = ''
  wordArr.forEach(str => {
    binString += hexToBin(str)
  })

  let k = []
  for (let i = 0; i < binString.length; ) {
    k.push(binString.slice(i, i + 4))
    i += 4
  }

  // k = k.join(' - ')
  const b = binString
  message += `\nKhóa k sau khi chuyển sang nhị phân k = \n${k.join(' - ')}\n`

  const PC1 = [
    b[56],
    b[48],
    b[40],
    b[32],
    b[24],
    b[16],
    b[8],
    b[0],
    b[57],
    b[49],
    b[41],
    b[33],
    b[25],
    b[17],
    b[9],
    b[1],
    b[58],
    b[50],
    b[42],
    b[34],
    b[26],
    b[18],
    b[10],
    b[2],
    b[59],
    b[51],
    b[43],
    b[35],
    b[62],
    b[54],
    b[46],
    b[38],
    b[30],
    b[22],
    b[14],
    b[6],
    b[61],
    b[53],
    b[45],
    b[37],
    b[29],
    b[21],
    b[13],
    b[5],
    b[60],
    b[52],
    b[44],
    b[36],
    b[28],
    b[20],
    b[12],
    b[4],
    b[27],
    b[19],
    b[11],
    b[3],
  ]

  let kPlus = ''

  message += '\nBảng PC1: \n'
  for (let i = 0; i < 56; ) {
    for (let j = i; j < i + 7; j++) {
      message += `${PC1[j]}   `
      kPlus += PC1[j]
    }
    message += '\n'
    i += 7
  }

  let kPlusArray = []
  for (let i = 0; i < kPlus.length; ) {
    kPlusArray.push(kPlus.slice(i, i + 7))
    i += 7
  }

  const C0 = kPlus.slice(0, 28)
  const D0 = kPlus.slice(28)

  // Dịch vòng trái 1 đơn vị được C1, D1
  const C1 = C0.slice(1).concat(C0[0])
  const D1 = D0.slice(1).concat(D0[0])

  const C1D1 = C1.concat(D1)

  const PC2 = [
    C1D1[13],
    C1D1[16],
    C1D1[10],
    C1D1[23],
    C1D1[0],
    C1D1[4],

    C1D1[2],
    C1D1[27],
    C1D1[14],
    C1D1[5],
    C1D1[20],
    C1D1[9],

    C1D1[22],
    C1D1[18],
    C1D1[11],
    C1D1[3],
    C1D1[25],
    C1D1[7],

    C1D1[15],
    C1D1[6],
    C1D1[26],
    C1D1[19],
    C1D1[12],
    C1D1[1],

    C1D1[40],
    C1D1[51],
    C1D1[30],
    C1D1[36],
    C1D1[47],
    C1D1[54],
    C1D1[29],
    C1D1[39],
    C1D1[50],
    C1D1[44],
    C1D1[32],
    C1D1[47],
    C1D1[43],
    C1D1[48],
    C1D1[38],
    C1D1[55],
    C1D1[33],
    C1D1[52],
    C1D1[45],
    C1D1[41],
    C1D1[49],
    C1D1[35],
    C1D1[28],
    C1D1[32],
  ]

  let k1 = ''

  message += '\nBảng PC2:\n'
  for (let i = 0; i < 48; ) {
    for (let j = i; j < i + 6; j++) {
      message += `${PC2[j]}   `
      k1 += PC2[j]
    }
    message += '\n'
    i += 6
  }

  let result = []
  for (let i = 0; i < k1.length; ) {
    result.push(k1.slice(i, i + 6))
    i += 6
  }

  message += `k1 = ${result.join(' - ')}`

  return message
}
