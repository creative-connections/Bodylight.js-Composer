import Zip from 'jszip'
import toAST from 'to-ast'
import escodegen from 'escodegen'

const validateContains = (zip) => {
  if (zip.files['modelDescription.xml'] === undefined) {
    throw Error("Zip file does not contain the 'modelDescription.xml' file ")
  }
}

const locateJs = (zip) => {
  let file = null
  Object.entries(zip.files).forEach(([key, f]) => {
    if (key.endsWith('js')) {
      file = f
    }
  })

  if (!file) {
    throw Error("Zip file does not contain the 'modelDescription.xml' file ")
  }
  return file
}

const postProcessJs = (js, name) => {
  /*
   * js contents (simplified):
   * var name = function(name) {...}; {module export}
   */
  const fun = new Function(`${js} ;return ${name}`)
  js = escodegen.generate(toAST(fun))
  return js
}

export default function unzipAndValidate (file) {
  return new Promise((resolve, reject) => {
    const jszip = new Zip()

    jszip.loadAsync(file).then((zip) => {
      try {
        validateContains(zip)
      } catch (error) {
        return reject(error)
      }

      const jsfile = locateJs(zip)
      const js = jsfile.async('string')
      const name = jsfile.name.slice(0,-3)
      const xml = zip.files['modelDescription.xml'].async('string')

      Promise.all([js, xml]).then((vals) => {
        const payload = {
          name,
          js: postProcessJs(vals[0], name),
          modelDescription: vals[1]
        }
        return resolve(payload)
      })
    }, (e) => {
      const err = Error('Error reading ' + file.name + ': ' + e.message)
      return reject(err)
    })
  })
}
