export default attrs => {
  const result = []
  for (let key in attrs) {
    let value = attrs[key]
    const toParse = value instanceof Array || value instanceof Object
    value = toParse ? JSON.stringify(value) : value
    result.push(`${key}=${toParse ? `'${value}'` : `"${value}"`}`)
  }
  return result.length ? ` ${result.join(' ')}` : ''
}
