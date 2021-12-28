import {
  encodeAffine,
  encodeAffineWithChar,
  calcInverseZn,
} from '../../features/index.js'

export const renderEncodeAffine = (plaintext, key, type = 'encode') => {
  plaintext = plaintext.toUpperCase()
  const result = encodeAffine(plaintext, key, type)
  if (result === false)
    return '<div>type phải là <strong>encode</strong> hoặc <strong>decode</strong></div>'
  const { a, b, aInverse, plaintextArrNum, encodeArrNum, encode } = result

  return `
  <div>
  Hàm tạo mã: e<sub>k</sub>(x) = ${a}x + ${b}<br>
  Hàm giải mã: d<sup>k</sup>(x) = ${aInverse}(y - ${b}) (vì ${a}<sup>-1</sup> mod 26 = ${aInverse})<br>
  
  ${type === 'encode' ? 'Mã hóa' : 'Giải mã'}: <br>
  <table>
    <tr>
      <th>${type === 'encode' ? 'Bản rõ' : 'Bản mã'}</th>
      ${plaintext
        .split('')
        .map(item => `<td>${item}</td>`)
        .join('')}
    </tr>
    <tr>
      <th>Ký tự</th>
      ${plaintextArrNum.map(item => `<td>${item}</td>`).join('')}
    </tr>
    <tr>
      <th>Áp dụng hàm ${type === 'encode' ? 'tạo mã' : 'giải mã'}</th>
      ${encodeArrNum.map(item => `<td>${item}</td>`).join('')}
    </tr>
    <tr>
      <th>${type === 'encode' ? 'Bản mã' : 'Bản rõ'}</th>
      ${encode
        .split('')
        .map(item => `<td>${item}</td>`)
        .join('')}
    </tr>
  </table>
  <br>
  ${type === 'encode' ? 'Bản mã' : 'Bản rõ'}: là ${encode}
  </div>
  `
}

export const renderEncodeAffineWithChar = (
  plaintext,
  a,
  aEncode,
  b,
  bEncode,
  type = 'encode'
) => {
  const findAB = encodeAffineWithChar(a, aEncode, b, bEncode)
  const { x, y, d, aResult, bResult, aNum, aEncodeNum, bNum, bEncodeNum } =
    findAB
  const intro = `
  <div>
    &emsp;${aEncode} &rarr;	${a} &emsp;&emsp;&emsp; ${bEncode} &rarr;	${b} <br>
    &rArr;${aEncodeNum} &rarr;	${aNum} &emsp;&emsp;&emsp; ${bEncodeNum} &rarr;	${bNum} <br>
    Giải hệ phương trình: <br>
    &rArr;${aEncodeNum} =	${aNum}&times;a + b <br>
    &emsp;${bEncodeNum} =	${bNum}&times;a + b <br>

    <span style="color: red;">Bấm lại máy tính để kiểm tra hệ phương trình, nếu giải sai thì giải tay sau đó điền a, b vào chức năng "mã hóa Affine" bên cạnh</span>
    <br>
    &rArr;a = <sup>${x * -d}</sup>&frasl;<sub>${-d}</sub> = ${
    x * -d
  }&times;${-d}<sup>-1</sup> mod 26 = ${x * -d}&times;${
    calcInverseZn(-d, 26).result
  } = ${aResult}
    <br>
    &emsp;b = <sup>${y * -d}</sup>&frasl;<sub>${-d}</sub> = ${
    y * -d
  }&times;${-d}<sup>-1</sup> mod 26 = ${y * -d}&times;${
    calcInverseZn(-d, 26).result
  } = ${bResult}

  </div>
  `

  const content = renderEncodeAffine(plaintext, `${aResult}, ${bResult}`, type)
  console.log(findAB)
  return intro + content
}
