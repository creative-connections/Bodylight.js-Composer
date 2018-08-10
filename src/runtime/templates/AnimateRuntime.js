export default class AnimateRuntime {
  constructor (name, source) {
    this.contents = {}
    source(createjs, this.contents)

    const compositionIds = Object.keys(this.contents.compositions)
    this.composition = this.contents.compositions[compositionIds[0]]
    this.library = this.composition.getLibrary()
    this.name = name

    if (this.library[this.name] === undefined) {
      console.error(this.name + ' is not a valid animate component')
    }

    this.attachExportedComponents(this.library)
    this.initialized = false
  }

  init (canvas, autoplay = false) {
    this.canvas = canvas
    this.canvas.style.display = 'block'

    const root = new this.library[this.name]()
    this.stage = new this.library.Stage(this.canvas)
    this.contents.compositionLoaded(this.library.properties.id)

    this.components = this.library.exportedComponents
    delete this.library.exportedComponents

    this.resize(this.canvas.clientWidth, this.canvas.clientHeight)

    this.stage.setAutoPlay(autoplay)
    this.stage.update()
    this.stage.addChild(root)

    // determine and load any Google Fonts required
    // const gfontFamilies = Object.keys(this.library.webFontTxtInst)
    // WebFont.load({ google: { families: gfontFamilies } })

    // register stage to receive tick updates
    createjs.Ticker.addEventListener('tick', this.stage)

    this.initialized = true

    return new Promise((resolve) => {
      var tickCounter = 0
      const waitTicks = () => {
        if (++tickCounter === 2) {
          createjs.Ticker.removeEventListener('tick', waitTicks)
          // this.resize(this.canvas.width, this.canvas.height)
          resolve()
        }
      }
      createjs.Ticker.addEventListener('tick', waitTicks)
    })
  }

  getComponents () {
    if (typeof this.components !== 'undefined') {
      return this.components
    }
    return []
  }

  destroy () {
    if (this.initialized) {
      createjs.Ticker.removeEventListener('tick', this.stage)
      this.stage.clear()
    }
  }

  /*
   * Animate export to CreateJS lazy adds components to stage only when they are
   * actually needed. This way on stage startup, not every component is
   * available, components that first appear on a frame not currently visible
   * have not been created at that point.
   *
   * So we can either cycle trough every available frame to make sure all
   * components get created and then walk the component tree. Or we can inject a
   * method for registering the components during library load.
   * addExportedComponents gets called on each named component definition,
   * injected into the Animate export file by a preprocess method elsewhere in
   * the code.
   */
  attachExportedComponents (library) {
    library.exportedComponents = {
      'anim': {},
      'text': {}
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
    // console.log(`Resizing canvas ${this.name}: ${width}x${height}`)
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

    /*
    // Original scaling respecting pRatio
    this.canvas.width = w * pRatio * sRatio
    this.canvas.height = h * pRatio * sRatio

    // Flooring removes blurry artefacts
    this.canvas.width = Math.floor(w * sRatio)
    this.canvas.height = Math.floor(h * sRatio)
    */

    // Let the canvas stretch horizontally to the right
    // and vertically to the left
    this.canvas.width = Math.floor(width)
    this.canvas.height = Math.floor(height)

    this.stage.scaleX = pRatio * sRatio
    this.stage.scaleY = pRatio * sRatio
    this.stage.update()
  }
}