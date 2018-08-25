import configureStore from '@src/configureStore'
import update from 'immutability-helper'
import AnimateRuntime from '@runtime/templates/AnimateRuntime'

import { editorPlaceAnimate, editorRemoveAnimate } from '@actions'
import { configGetAnimate } from '@reducers'

import { ANIMATE, ANIMATE_ID } from '../types.js'
import { handleChangeID } from '../../commons/Components'

const animateRuntimeStore = {}

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(ANIMATE, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'canvas',
        classes: [],
        traits: [{
          type: ANIMATE_ID,
          label: 'Animate',
          name: 'id'
        }],
        resizable: true
      })
    }, {
      isComponent: (el) => {
        if (el.tagName === 'CANVAS' && el.classList.contains(ANIMATE)) {
          return {type: ANIMATE}
        }
      }
    }),

    view: defaultType.view.extend({
      events: {
        changeID: 'handleChangeID',
        click: 'handleClick'
      },

      /**
       * Loads animate configuration from Redux state.
       * @return {animate configuration}
       */
      getAnimate () {
        const id = this.attr.id
        if (typeof id === 'undefined' || id === null || id === '') {
          return null
        }
        return configGetAnimate(configureStore().store.getState(), id)
      },

      clearCanvas () {
        this.detachRuntime()
        this.el.getContext('2d').clearRect(0, 0, this.el.width, this.el.height)
      },

      handleClick () {
        // We want to open component settings when animate is unset
        if (this.getAnimate() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      },

      /**
       * Callback on the event 'changeID'. Animate provider has changed, we
       * need to redraw it in the editor.
       */
      handleChangeID (event) {
        handleChangeID(this, event, editorPlaceAnimate, editorRemoveAnimate)
        this.attachRuntime()
      },

      drawPlaceholder () {
        this.clearCanvas()

        const width = this.el.clientWidth
        const height = this.el.clientHeight
        this.el.width = width
        this.el.height = height

        // ANIMATE logo
        if (!this.strokeBorder) {
          this.strokeBorder = new Path2D('m0 0.3v23.4h24v-23.4zm1 1h22v21.4h-22z')
          this.strokeText = new Path2D(`m6.7 13.54-0.8 2.99c-0.02 0.08-0.05 0.09-0.15
            0.09h-1.47c-0.1 0-0.12-0.03-0.1-0.15l2.85-9.96c0.05-0.18 0.08-0.29
            0.1-0.79 0-0.07 0.03-0.1 0.08-0.1h2.1c0.07 0 0.1 0.02 0.12 0.1l3.19
            10.77c0.02 0.08 0 0.13-0.08 0.13h-1.65c-0.08
            0-0.13-0.01-0.15-0.07l-0.83-3.01zm2.79-1.65c-0.28-1.11-0.94-3.52-1.19-4.7h-0.02c-0.21
            1.17-0.74 3.14-1.16 4.7zm4.07-1.75c0-0.1 0-0.45-0.05-1.03 0-0.07
            0.02-0.08 0.09-0.12 0.84-0.31 1.94-0.66 3.08-0.66 1.41 0 2.95 0.55 2.95
            2.96v5.2c0 0.1-0.03 0.13-0.12 0.13h-1.5c-0.1
            0-0.13-0.05-0.13-0.13v-5.06c0-0.96-0.34-1.49-1.33-1.49-0.43 0-0.84
            0.08-1.13 0.18v6.39c0 0.07-0.03 0.12-0.1 0.12h-1.63c-0.08
            0-0.12-0.03-0.12-0.12v-6.37z`)
        }

        let scale
        if (height < width) {
          scale = Math.min(5, height / 45)
        } else {
          scale = Math.min(5, width / 45)
        }

        const ctx = this.el.getContext('2d')
        ctx.translate(((width) / 2) - (12 * scale), (height / 2) - (12 * scale))
        ctx.scale(scale, scale)

        ctx.strokeStyle = '#C0C0C0'
        ctx.fillStyle = '#C0C0C0'
        ctx.stroke(this.strokeBorder)
        ctx.fill(this.strokeText)
      },

      /**
       * Attaches runtime to the canvas, else draws a placeholder
       */
      attachRuntime () {
        this.clearCanvas()

        const animate = this.getAnimate()
        if (animate === null) {
          return this.drawPlaceholder()
        }

        const cachedRuntime = animateRuntimeStore[animate.name]
        if (cachedRuntime === undefined || cachedRuntime.hash !== animate.hash) {
          const js = AnimateRuntime.functionalizeSource(animate.js)
          this.runtime = new AnimateRuntime(animate.originalName, js)
          this.runtime.init(this.el, false, false).then()

          // save for future use
          animateRuntimeStore[animate.name] = {
            runtime: this.runtime,
            hash: animate.hash
          }
        } else {
          // we already have a runtime up and running, just attach
          this.runtime = cachedRuntime.runtime
          this.runtime.attachCanvas(this.el)
        }

        window.setTimeout(this.resizeRuntime, 10)
      },

      detachRuntime () {
        if (this.runtime !== undefined) {
          this.runtime.detachCanvas()
          delete this.runtime
        }
      },

      resizeRuntime () {
        if (this.runtime !== undefined) {
          const el = this.el
          this.runtime.resize(el.clientWidth, el.clientHeight)
        }
      },

      handleUpdate (e) {
        const el = this.el

        // check if we need to resize
        if (this.prevCW !== el.clientWidth || this.prevCH !== el.clientHeight) {
          this.prevCW = this.el.clientWidth
          this.prevCH = this.el.clientHeight

          if (this.runtime === undefined) {
            return this.drawPlaceholder()
          }

          this.resizeRuntime()
        }
      },

      /**
       * Registers event listeners for component update.
       */
      registerUpdateHandler () {
        /*
         * Registering resize listeners, this is kinda inefficient
         * TODO: see changes in https://github.com/artf/grapesjs/issues/1355 for
         * a better solution to catching events
         */
        this.prevCW = null
        this.prevCH = null
        editor.on('component:styleUpdate', this.handleUpdate)
        editor.on('component:update', this.handleUpdate)
        editor.on('load', this.handleUpdate)

        this.handlersRegistered = true
      },

      deregisterUpdateHandler () {
        if (this.handlersRegistered !== true) {
          return
        }

        editor.off('component:styleUpdate', this.handleUpdate)
        editor.off('component:update', this.handleUpdate)
        editor.off('load', this.handleUpdate)

        this.handlersRegistered = false
      },

      onRender () {
        // bind used callbacks
        this.handleUpdate = this.handleUpdate.bind(this)
        this.resizeRuntime = this.resizeRuntime.bind(this)

        this.attachRuntime()
        this.registerUpdateHandler()
      },

      remove () {
        defaultType.view.prototype.remove.apply(this, arguments)
        this.detachRuntime()
        this.deregisterUpdateHandler()

        // update redux state that we have removed our animate endpoint
        const id = this.attr.id
        configureStore().store.dispatch(editorRemoveAnimate(id))
      }

    })

  })
}
