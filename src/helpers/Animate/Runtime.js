import AnimateError from '@exceptions/AnimateError'
import WebFont from 'webfontloader'

class Runtime {
  constructor (source, name) {
    const initContents = Function(' "use strict"; return(' + source + ')')

    this.contents = {}
    initContents()(createjs, this.contents)

    const compositionIds = Object.keys(this.contents.compositions)
    this.composition = this.contents.compositions[compositionIds[0]]
    this.library = this.composition.getLibrary()
    this.name = name

    if (this.library[this.name] === undefined) {
      throw new AnimateError(`'${this.name}' is not a valid animate component`)
    }

    this.attachExportedComponents(this.library)
  }

  init (canvas, autoplay = false) {
    this.canvas = canvas
    this.canvas.style.display = 'block'

    const root = new this.library[this.name]()
    this.stage = new this.library.Stage(this.canvas)
    this.contents.compositionLoaded(this.library.properties.id)

    this.components = this.library.exportedComponents
    delete this.library.exportedComponents

    this.resize(this.canvas.width, this.canvas.height)
    this.stage.setAutoPlay(autoplay)
    this.stage.update()
    this.stage.addChild(root)

    // determine and load any Google Fonts required
    const gfontFamilies = Object.keys(this.library.webFontTxtInst)
    WebFont.load({ google: { families: gfontFamilies } })

    // register stage to receive tick updates
    createjs.Ticker.addEventListener('tick', this.stage)

    return new Promise((resolve, reject) => {
      var tickCounter = 0
      const waitTicks = () => {
        if (++tickCounter === 2) {
          createjs.Ticker.removeEventListener('tick', waitTicks)
          resolve()
        }
      }
      createjs.Ticker.addEventListener('tick', waitTicks)
    })
  }

  destroy () {
    createjs.Ticker.removeEventListener('tick', this.stage)
    this.stage.clear()
  }

  attachExportedComponents (library) {
    library.exportedComponents = {
      'anim': {},
      'text': {},
      'range': {},
      'checkbox': {}
    }
    library.addExportedComponent = component => {
      var getNameSuffix = name => {
        return name.substr(name.lastIndexOf('_') + 1, name.length)
      }
      var suffix = getNameSuffix(component.name)
      if (typeof library.exportedComponents[suffix] !== 'undefined') {
        if (typeof library.exportedComponents[suffix][component.name] !== 'undefined') {
          console.warn('Duplicate stage name ' + component.name)
        }
        library.exportedComponents[suffix][component.name] = (component)
      }
    }
  }

  resize (width, height) {
    const w = this.library.properties.width
    const h = this.library.properties.height

    const pRatio = window.devicePixelRatio || 1
    const xRatio = width / w
    const yRatio = height / h
    var sRatio = 1

    const scaleType = 1
    if (scaleType === 1) {
      sRatio = Math.min(xRatio, yRatio)
    } else if (scaleType === 2) {
      sRatio = Math.max(xRatio, yRatio)
    }

    this.canvas.width = w * pRatio * sRatio
    this.canvas.height = h * pRatio * sRatio
    this.canvas.width = Math.floor(w * sRatio)
    this.canvas.height = Math.floor(h * sRatio)

    this.stage.scaleX = pRatio * sRatio
    this.stage.scaleY = pRatio * sRatio
    this.stage.update()
  }
}

export default Runtime
