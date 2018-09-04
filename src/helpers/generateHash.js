const sha256 = require('js-sha256')

const generateHash = source => {
  const buffer = new TextEncoder('utf-8').encode(source)
  return new Promise(resolve => {
    const hex = sha256.hex(buffer)
    resolve(hex)
  })
}

export default generateHash
