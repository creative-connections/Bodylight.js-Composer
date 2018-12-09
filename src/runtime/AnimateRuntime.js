export default class AnimateRuntime {
  constructor(name, source, id) {
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

  init(canvas, autoplay = false) {
    this.canvas = canvas
    this.canvas.style.display = 'block'

    this.root = new this.library[this.name]()
    this.stage = new this.library.Stage(this.canvas)
    this.contents.compositionLoaded(this.library.properties.id)

    this.components = this.filterExportedComponents(this.exportedComponents)
    delete this.exportedComponents

    this.stage.setAutoPlay(autoplay)
    this.stage.update()
    this.stage.addChild(this.root)

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

  getComponents() {
    if (typeof this.components !== 'undefined') {
      return this.components
    }
    return []
  }

  destroy() {
    if (this.initialized) {
      this.stopListeners()
      this.stage.clear()
      this.deregisterClickHandlers()
    }
  }

  attachCanvas(canvas) {
    this.stopListeners()
    this.stage.enableDOMEvents(false)
    this.stage.canvas = canvas
    this.canvas = canvas
    this.stage.enableDOMEvents(true)
    this.startListeners()
  }

  detachCanvas() {
    this.stopListeners()
    this.stage.enableDOMEvents(false)
    this.stage.canvas = null
    this.canvas = null
    this.stage.enableDOMEvents(true)
  }

  startListeners() {
    createjs.Ticker.addEventListener('tick', this.handleTick)
  }

  stopListeners() {
    createjs.Ticker.removeEventListener('tick', this.handleTick)
  }

  handleTick() {
    if (this.perf) { this.perf.start(this.id, 'update') }

    // Animate 2019 Support
    if (this.contents.Layer !== undefined) {
      this.ZDepthHandleTick()
    }
    this.stage.update()
    this.resize()

    if (this.perf) { this.perf.stop(this.id, 'update') }
  }

  ZDepthHandleTick() {
    const cameraInstance = this.root.___camera___instance
    if (cameraInstance !== undefined && cameraInstance.pinToObject !== undefined) {
      cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX
      cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY
      if (cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined) {
        cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ
      }
    }
    this.applyLayerZDepth(this.root)
  }

  applyLayerZDepth(parent) {
    const cameraInstance = parent.___camera___instance
    const focalLength = 528.25
    const projectionCenter = { 'x': 0, 'y': 0 }
    if (parent === this.root) {
      const stageCenter = { 'x': this.library.properties.width / 2, 'y': this.library.properties.height / 2 }
      projectionCenter.x = stageCenter.x
      projectionCenter.y = stageCenter.y
    }
    for (const child in parent.children) {
      const layerObj = parent.children[child]
      if (layerObj === cameraInstance) { continue }
      this.applyLayerZDepth(layerObj, cameraInstance)
      if (layerObj.layerDepth === undefined) { continue }
      if (layerObj.currentFrame !== layerObj.parent.currentFrame) {
        layerObj.gotoAndPlay(layerObj.parent.currentFrame)
      }
      const matToApply = new createjs.Matrix2D()
      let cameraMat = new createjs.Matrix2D()
      let totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0
      let cameraDepth = 0
      if (cameraInstance && !layerObj.isAttachedToCamera) {
        const mat = cameraInstance.getMatrix()
        mat.tx -= projectionCenter.x
        mat.ty -= projectionCenter.y
        cameraMat = mat.invert()
        cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0)
        cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0)
        if (cameraInstance.depth) { cameraDepth = cameraInstance.depth }
      }
      if (layerObj.depth) {
        totalDepth = layerObj.depth
      }
      // Offset by camera depth
      totalDepth -= cameraDepth
      if (totalDepth < -focalLength) {
        matToApply.a = 0
        matToApply.d = 0
      } else {
        if (layerObj.layerDepth) {
          const sizeLockedMat = this.getProjectionMatrix(parent, layerObj.layerDepth)
          if (sizeLockedMat) {
            sizeLockedMat.invert()
            matToApply.prependMatrix(sizeLockedMat)
          }
        }
        matToApply.prependMatrix(cameraMat)
        const projMat = this.getProjectionMatrix(parent, totalDepth)
        if (projMat) {
          matToApply.prependMatrix(projMat)
        }
      }
      layerObj.transformMatrix = matToApply
    }
  }

  getProjectionMatrix(container, totalDepth) {
    const focalLength = 528.25
    const projectionCenter = { x: this.library.properties.width / 2, y: this.library.properties.height / 2 }
    const scale = (totalDepth + focalLength) / focalLength
    const scaleMat = new createjs.Matrix2D()
    scaleMat.a = 1 / scale
    scaleMat.d = 1 / scale
    let projMat = new createjs.Matrix2D()
    projMat.tx = -projectionCenter.x
    projMat.ty = -projectionCenter.y
    projMat = projMat.prependMatrix(scaleMat)
    projMat.tx += projectionCenter.x
    projMat.ty += projectionCenter.y
    return projMat
  }

  attachExportedComponents(library) {
    this.exportedComponents = []
    library.addExportedComponent = component => {
      this.exportedComponents.push(component)
    }
  }

  getSuffixes() {
    return ['_text', '_play', '_anim']
  }

  getNameSuffix(name) {
    if (!name) {
      return null
    }

    let found = null
    this.getSuffixes().map((suffix) => {
      const index = name.lastIndexOf(suffix)
      if (~index) { found = suffix.substr(1) }
    })
    console.log(name, found)
    return found
  }

  getNameWithoutSuffix(name) {
    if (!name) {
      return null
    }
    const index = name.lastIndexOf(this.getNameSuffix(name))
    return name.substr(0, index - 1)
  }

  filterExportedComponents(exportedComponents) {
    const components = {
      'anim': {},
      'text': {},
      'play': []
    }

    exportedComponents.forEach(component => {
      const suffix = this.getNameSuffix(component.name)
      if (typeof components[suffix] !== 'undefined') {
        if (suffix === 'play') {
          components['play'].push(component)
          return
        }

        if (typeof components[suffix][component.name] !== 'undefined') {
          // at that point it's out of scope of the composer anyway
          for (let i = 1; i < 100000; i++) {
            const name = `${this.getNameWithoutSuffix(component.name)}_${i}_${suffix}`
            if (typeof components[suffix][name] === 'undefined') {
              component.name = name
              components[suffix][name] = component
              return
            }
          }
        }

        components[suffix][component.name] = component
      }
    })

    return components
  }

  blink(widget) {
    if (this.highlighted) {
      const component = this.highlighted.component
      window.clearInterval(this.highlighted.blinker)
      component.alpha = this.highlighted.alpha
      if (typeof component.gotoAndStop !== 'undefined') {
        component.gotoAndStop(0)
      }
      this.highlighted = null
    }

    if (!widget) {
      return
    }

    if (widget.parent === this.id) {
      const category = this.components[this.getNameSuffix(widget.name)]
      if (category && category[widget.name]) {
        const component = category[widget.name]
        const alpha = component.alpha

        const framecount = component.timeline ? component.timeline.duration - 1 : null
        let position = 0
        let direction = 1
        const blinker = window.setInterval(() => {
          if (component.alpha > 1) {
            direction = 0
          } else if (component.alpha < 0.4) {
            direction = 1
          }
          if (direction) {
            component.alpha = component.alpha + 0.08
          } else {
            component.alpha = component.alpha - 0.08
          }
          if (framecount !== null) {
            position = (position + 1) % framecount
            component.gotoAndStop(position)
          }
        }, 20)

        this.highlighted = { component, blinker, alpha }
      }
    }
  }

  registerClickHandler(handler) {
    this.deregisterClickHandlers()

    const register = component => {
      if (component.on == null) { return }
      this.onDblclickHandlers.push({
        handler: component.on('dblclick', handler),
        component
      })
    }

    Object.values(this.components.anim).forEach(anim => register(anim))
    Object.values(this.components.text).forEach(text => register(text))
  }

  deregisterClickHandlers() {
    if (this.onDblclickHandlers == null) {
      this.onDblclickHandlers = []
      return
    }
    this.onDblclickHandlers.forEach(({ handler, component }) => {
      component.off('dblclick', handler)
    })
    this.onDblclickHandlers = []
  }

  resize() {
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
    this.stage.tickOnUpdate = false
    this.stage.update()
    this.stage.tickOnUpdate = true
  }

  /*
   * Initializes a virutal Runtime and determines the component names.
   * Returns Promise with {category: [comp1, comp2,...]} on resolve
   */
  static getComponentNames(source, name) {
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

  static functionalizeSource(source) {
    return Function(`"use strict"; return(${source})`)()
  }
}