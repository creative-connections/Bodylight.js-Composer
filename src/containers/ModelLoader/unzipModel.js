import Zip from 'jszip'

function validateContains (zip, name) {
  if (zip.files[name + '.js'] === undefined) {
    throw Error(`Zip file does not contain the compiled JavaScript file ''${name}.js'`)
  }
  if (zip.files[name + '.wasm'] === undefined) {
    throw Error(`Zip file does not contain a compiled WebAssembly file '${name}.wasm'`)
  }
  if (zip.files['modelDescription.xml'] === undefined) {
    throw Error("Zip file does not contain the 'modelDescription.xml' file ")
  }
}

export default function unzipModel (file) {
  return new Promise((resolve, reject) => {
    const jszip = new Zip()

    const name = file.name.replace(/\.[^/.]+$/, '')

    jszip.loadAsync(file).then((zip) => {
      try {
        validateContains(zip, name)
      } catch (error) {
        return reject(error)
      }

      var js = zip.files[name + '.js'].async('string')
      var wasm = zip.files[name + '.wasm'].async('blob')
      var xml = zip.files['modelDescription.xml'].async('string')

      Promise.all([js, wasm, xml]).then((vals) => {
        var payload = {
          name: name,
          js: vals[0],
          wasm: vals[1],
          modelDescription: vals[2]
        }
        return resolve(payload)
      })
    }, (e) => {
      const err = Error('Error reading ' + file.name + ': ' + e.message)
      return reject(err)
    })
  })
}
