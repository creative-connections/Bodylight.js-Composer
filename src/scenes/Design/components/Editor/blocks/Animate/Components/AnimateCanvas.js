import configureStore from '@src/configureStore'
import AnimateRuntime from '@helpers/Animate/Runtime'

import { ANIMATE_CANVAS, ANIMATE_ID } from '../types.js'

import update from 'immutability-helper'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(ANIMATE_CANVAS, {
    model: defaultModel.extend({
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'canvas',
        classes: [],
        traits: [{
          type: ANIMATE_ID,
          label: 'Animate',
          name: 'name'
        }],
        resizable: true
      })
    }, {
      isComponent: (el) => {
        if (el.tagName === 'CANVAS' && el.classList.contains(ANIMATE_CANVAS)) {
          return {type: ANIMATE_CANVAS}
        }
      }
    }),

    view: defaultType.view.extend({
      events: {
        changeName: 'handleChangeName',
        click: 'handleClick'
      },

      /**
       * Loads animate configuration from Redux state.
       * @return {animate configuration}
       */
      getAnimate () {
        const name = this.attr.name
        const state = configureStore().store.getState()
        // if we don't have a valid animate name, we draw a placeholder instead
        if (typeof name === 'undefined' || name === null || name === '' ||
            typeof state.animates[name] === 'undefined') {
          return null
        }
        return update(state.animates[name], {name: {$set: name}})
      },

      /**
       * Stops any running runtime attached to our canvas, and then clears it.
       */
      clearCanvas () {
        this.destroyRuntime()
        this.el.getContext('2d').clearRect(0, 0, this.el.width, this.el.height)
      },

      handleClick () {
        // We want to open component settings when animate is unset
        if (this.getAnimate() === null) {
          editor.Panels.getButton('views', 'open-tm').set('active', true)
        }
      },

      /**
       * Callback on the event 'changeName'. Animate provider has changed, we
       * need to redraw it in the editor.
       */
      handleChangeName () {
        /*
         * Trait sets this automatically somewhere down the lifecycle, but we
         * need the value before that happens. This should be safe.
         */
        this.attr.name = this.el.getAttribute('name')

        this.attachRuntime()
      },

      drawPlaceholder () {
        // TODO: this needs to be nicer
        const ctx = this.el.getContext('2d')
        ctx.font = '25px serif'
        ctx.fillText('Animate - not selected', 50, 50)
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
        this.runtime = new AnimateRuntime(animate.source, animate.name)
        this.runtime.init(this.el, false, false).then()
        window.setTimeout(this.resizeRuntime, 10)
      },

      destroyRuntime () {
        if (typeof this.runtime !== 'undefined') {
          this.runtime.destroy()
          delete this.runtime
        }
      },

      resizeRuntime () {
        if (typeof this.runtime !== 'undefined') {
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

          if (typeof this.runtime === 'undefined') {
            return // TODO: resize placeholder
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
        this.destroyRuntime()
        this.deregisterUpdateHandler()
      }

    })

  })

  return ANIMATE_CANVAS
}
