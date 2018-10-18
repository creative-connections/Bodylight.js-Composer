export default class AnimateRuntime {
  constructor (name, source, id) {
    this.contents = {}
    source(createjs, this.contents)

    this.id = id

    const compositionIds = Object.keys(this.contents.compositions)
    this.composition = this.contents.compositions[compositionIds[0]]
    this.library = this.composition.getLibrary()
    createjs.MotionGuidePlugin.install()
    this.name = name

    if (this.library[this.name] === undefined) {
      throw new Error(`'${this.name}' is not a valid animate component`)
    }

    // check for perf component presence
    if (typeof perf !== 'undefined') {
      this.perf = perf
      this.perf.register(id, name, 'animate')
    }

    this.handleTick = this.handleTick.bind(this)
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

    this.stage.setAutoPlay(autoplay)
    this.stage.update()
    this.stage.addChild(root)

    // determine and load any Google Fonts required
    // const gfontFamilies = Object.keys(this.library.webFontTxtInst)
    // WebFont.load({ google: { families: gfontFamilies } })

    // register stage to receive tick updates
    this.resize = this.resize.bind(this)
    this.startListeners()

    this.initialized = true

    return new Promise((resolve) => {
      let tickCounter = 0
      const waitTicks = () => {
        if (++tickCounter === 2) {
          createjs.Ticker.removeEventListener('tick', waitTicks)
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
      this.stopListeners()
      this.stage.clear()
    }
  }

  attachCanvas (canvas) {
    this.stopListeners()
    this.stage.enableDOMEvents(false)
    this.stage.canvas = canvas
    this.canvas = canvas
    this.stage.enableDOMEvents(true)
    this.startListeners()
  }

  detachCanvas () {
    this.stopListeners()
    this.stage.enableDOMEvents(false)
    this.stage.canvas = null
    this.canvas = null
    this.stage.enableDOMEvents(true)
  }

  startListeners () {
    createjs.Ticker.addEventListener('tick', this.handleTick)
  }

  stopListeners () {
    createjs.Ticker.removeEventListener('tick', this.handleTick)
  }

  handleTick () {
    if (this.perf) { this.perf.start(this.id, 'update') }

    this.stage.update()
    this.resize()

    if (this.perf) { this.perf.stop(this.id, 'update') }
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
      'play': [],
      'text': {}
    }
    library.addExportedComponent = component => {
      const getNameSuffix = name => {
        return name.substr(name.lastIndexOf('_') + 1, name.length)
      }
      const suffix = getNameSuffix(component.name)
      if (typeof library.exportedComponents[suffix] !== 'undefined') {
        if (suffix !== 'play') {
          if (typeof library.exportedComponents[suffix][component.name] !== 'undefined') {
            console.warn('Duplicate stage name ' + component.name)
          }
          library.exportedComponents[suffix][component.name] = (component)
        } else {
          // TODO FIXME
          // temporary special case handling for "playable" components
          library.exportedComponents['play'].push(component)
        }
      }
    }
  }

  resize () {
    // noop if render size didn't change
    if (this.prevClientWidth === this.canvas.clientWidth &&
      this.prevClientHeight === this.canvas.clientHeight) {
      return
    }
    this.prevClientWidth = this.canvas.clientWidth
    this.prevClientHeight = this.canvas.clientHeight

    const w = this.library.properties.width
    const h = this.library.properties.height

    const aspect = h / w

    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight

    const pRatio = window.devicePixelRatio || 1
    let xRatio = width / w
    let yRatio = height / h
    let sRatio = xRatio

    /*
    const scaleType = 2
    if (scaleType === 1) {
      sRatio = Math.min(xRatio, yRatio)
    } else if (scaleType === 2) {
      sRatio = Math.max(xRatio, yRatio)
    }
    */

    // Flooring removes blurry artefacts
    this.canvas.width = Math.floor(width * pRatio)
    // Height is calculated from width and aspect ratio
    this.canvas.height = Math.floor((width * pRatio) * aspect)

    this.stage.scaleX = pRatio * sRatio
    this.stage.scaleY = pRatio * sRatio
    this.stage.update()
  }

  /*
   * Initializes a virutal Runtime and determines the component names.
   * Returns Promise with {category: [comp1, comp2,...]} on resolve
   */
  static getComponentNames (source, name) {
    return new Promise((resolve, reject) => {
      // init new runtime to fill library with components
      let runtime
      try {
        runtime = new AnimateRuntime(name, source)
      } catch (error) {
        reject(error)
        return
      }
      const canvas = document.createElement('canvas')
      runtime.init(canvas).then(() => {
        const components = runtime.getComponents()
        const out = {}

        // transform to strings
        const categories = Object.keys(components)
        categories.forEach(category => {
          out[category] = []
          const nodes = Object.keys(components[category])
          nodes.forEach(node => {
            out[category].push(node)
          })
        })
        runtime.destroy()
        resolve(out)
      })
    })
  }

  static functionalizeSource (source) {
    return Function(`"use strict"; return(${source})`)()
  }
}
