import Zip from 'jszip'

class HandlesModelZip {
  unzip (file) {
    return new Promise((resolve, reject) => {
      const jszip = new Zip()

      const name = file.name.replace(/\.[^/.]+$/, '')

      jszip.loadAsync(file).then((zip) => {
        try {
          this.validateContains(zip, name)
        } catch (error) {
          reject(error)
        }

        resolve()
      }, function (e) {
        const err = Error('Error reading ' + file.name + ': ' + e.message)
        console.error(err)
        reject(err)
      })
    })
  }

  validateContains (zip, name) {
    if (zip.files[name + '.js'] === undefined) {
      throw Error('Zip file does not contain a compiled file ' + name + '.js')
    }
    if (zip.files[name + '.wasm'] === undefined) {
      throw Error('Zip file does not contain a compiled file ' + name + '.wasm')
    }
    if (zip.files['modelDescription.xml'] === undefined) {
      throw Error('Zip file does not contain a modelDescription.xml file ')
    }
  }
}

export default HandlesModelZip
