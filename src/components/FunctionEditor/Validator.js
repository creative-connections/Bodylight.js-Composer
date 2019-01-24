import Parser from './Parser'

const checkNumber = fn => {
  const check = result => {
    const type = typeof result
    if (type !== 'number') {
      throw new EvalError(`expected number, was: >${result}< (${type})`)
    }
  }

  let test = 0
  try {
    check(fn(test))
    test = -1.2
    check(fn(test))
    test = 1.2
    check(fn(test))
  } catch (e) {
    throw EvalError(`f(${test}): ${e.message}`)
  }
}

const checkBoolean = fn => {
  const check = result => {
    const type = typeof result
    if (type !== 'boolean') {
      throw new EvalError(`expected boolean, was: >${result}< (${type})`)
    }
  }

  let test = 1
  try {
    check(fn(test))
  } catch (e) {
    throw EvalError(`f(${test}): ${e.message}`)
  }
}

const run = (code, type) => {
  const source = '"use strict"; return ' + code + ''
  const wrapperFunction = new Function(source)
  const actualFunction = wrapperFunction()

  if (type === 'number') {
    checkNumber(actualFunction)
  } else if (type === 'boolean') {
    checkBoolean(actualFunction)
  }
}

class Validator {
  static validate (code, type) {
    let result = {
      error: false,
      message: null,
      parsed: null
    }

    try {
      result.parsed = Parser.parse(code)
    } catch (e) {
      result.error = true
      result.message = `Syntax error: ${e.message}`
      return result
    }

    // skip run validation
    if (type === false) {
      return result
    }

    /*
     * TEMP FIXME: add API methods mockups
     * try {
     * run(result.parsed, type)
     * } catch (e) {
     * result.error = true
     * result.message = `Runtime error: ${e.message}`
     * return result
     * }
     */

    return result
  }
}

export default Validator
