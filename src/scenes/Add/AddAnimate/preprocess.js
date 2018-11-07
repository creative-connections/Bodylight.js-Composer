const preprocess = (file) => {
  return new Promise((resolve, reject) => {
  // TODO: this will need to be versioned for different animate versions

    // Adobe Animate CC 2018

    const lines = file.match(/^.*((\r\n|\n|\r)|$)/gm)
    const outlines = []

    const notfound = [ true ]

    lines.forEach(line => {
      if (notfound[0]) {
        if (line.indexOf('function (cjs, an') !== -1) {
          outlines.push('function notanon(cjs, an) {')
          notfound[0] = false
          return
        }
      }
      if (line.indexOf('(createjs = createjs||{}, AdobeAn = AdobeAn') !== -1) {
        outlines.push('}')
        return
      }
      if (line.indexOf('createjs, AdobeAn') !== -1) {
        return
      }

      // matches lines like 'this.component.name = "component_anim"' retrieves
      // "this.component" and inserts it as a library exported component
      let match = line.match('\\s(.*)\\.name\\s*=\\s*".*"')
      if (match) {
        const reference = match[1]
        const newline = `lib.addExportedComponent(${reference});`
        outlines.push(line)
        outlines.push(newline)
        return
      }

      // global reference to AdobeAn in 'AdobeAn.Layer = new function() {'
      // needs to be replaced with 'an'
      match = line.match(/AdobeAn\.Layer\s*=\s*new\s*function\(\)\s*{/)
      if (match) {
        outlines.push('an.Layer = new function () {')
        return
      }

      outlines.push(line)
    })

    resolve(outlines.join(''))
  })
}

export default preprocess
