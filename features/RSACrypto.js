import { congruenceEquation, exponentialZn } from './index.js'

export const rsa = (p, q, e, m) => {
  // * Tính N, n
  const N = p * q
  const n = (p - 1) * (q - 1)

  // * Tìm đồng dư của e trong module n: d.e === 1 (mod 20)
  const d = congruenceEquation(e, 1, n).x

  // * Khoá công khai:K[u] = (e, N) = (3, 33)
  // * Khoá bí mật:K[r] = (d, N) = (7, 33)

  // *Mã hóa: C = E(M, K[u]) = M^e mod N
  const encodeTable = exponentialZn(m, e, N)
  const C = encodeTable.b

  // *Lây kết quả bước trên in thành bảng trình bày thuật toán
  // *Giải mã: M = D(C, K[r]) = C^d mod N
  const decodeTable = exponentialZn(C, d, N)
  const M = decodeTable.b
  // console.log(decodeTable)

  return { N, n, d, encodeTable, C, decodeTable, M }

  // console.log(d)
}
