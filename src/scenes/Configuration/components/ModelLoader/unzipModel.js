import Zip from 'jszip'

function validateContains (zip, name) {
  if (zip.files[name + '.js'] === undefined) {
    throw Error(`Zip file does not contain the compiled JavaScript file ''${name}.js'`)
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
      var xml = zip.files['modelDescription.xml'].async('string')

      Promise.all([js, xml]).then((vals) => {
        var payload = {
          name: name,
          js: vals[0],
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
