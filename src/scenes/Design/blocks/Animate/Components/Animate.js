import configureStore, { observeStore } from '@src/configureStore'
import AnimateRuntime from '@runtime/templates/AnimateRuntime'
import WidgetType from '@helpers/enum/WidgetType'
import { configGetAnimate, getSelectedWidget, getAnimateWidgetId } from '@reducers'
import { removeAnimate, selectWidget, addAnimate } from '@actions'
import { ANIMATE, ANIMATE_ID } from '../types.js'
import {
  handleChangeID,
  handleOnDrop,
  init,
  getWidget,
  destroy,
  handleClick
} from '../../commons/Components'

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
        resizable: {
          tl: 0, // Top left
          tc: 0, // Top center
          tr: 0, // Top right
          cl: 0, // Center left
          cr: 1, // Center right
          bl: 0, // Bottom left
          bc: 0, // Bottom center
          br: 0 // Bottom right
        }
      })
    }),

    view: defaultType.view.extend({
      initialize() {
        defaultType.view.prototype.initialize.apply(this, arguments)
        this.drawPlaceholder = this.drawPlaceholder.bind(this)
        this.logo = {
          stroke: new Path2D('m0 0.3v23.4h24v-23.4zm1 1h22v21.4h-22z'),
          fill: new Path2D(`m6.7 13.54-0.8 2.99c-0.02 0.08-0.05 0.09-0.15
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
      },

      events: {
        click: 'handleClick'
      },

      getWidget() {
        return getWidget.bind(this)(configGetAnimate)
      },

      handleClick() {
        handleClick(this.getWidget(), editor)
      },

      clearCanvas() {
        this.el.getContext('2d').clearRect(0, 0, this.el.width, this.el.height)
      },

      drawPlaceholder() {
        this.clearCanvas()

        const width = this.el.clientWidth
        const height = this.el.clientHeight
        this.el.width = width
        this.el.height = height === 0 ? 100 : height

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
        ctx.stroke(this.logo.stroke)
        ctx.fill(this.logo.fill)
      },

      init() {
        init.bind(this)(editor)
      },

      handleOnDrop() {
        handleOnDrop.bind(this)(configGetAnimate, addAnimate)
      },

      createRuntime(animate) {
        const js = AnimateRuntime.functionalizeSource(animate.js)
        const runtime = new AnimateRuntime(animate.originalName, js, animate.id)
        runtime.init(this.el, false, false).then()

        // register double click handlers, select animate widget
        let timestamp = Date.now()
        runtime.registerClickHandler(e => {
          if (Date.now() - timestamp < 100 || e.currentTarget == null || e.currentTarget.name == null) {
            return
          }
          const store = configureStore().store
          const id = getAnimateWidgetId(store.getState(), animate.id, e.currentTarget.name)

          if (id !== null) {
            store.dispatch(selectWidget(id))
            timestamp = Date.now()
          }
        })

        return runtime
      },


      attachRuntime(id) {
        const cached = animateRuntimeStore[id]
        if (!this.runtime && cached) {
          this.runtime = cached.runtime
        }

        if (this.runtime) {
          this.clearCanvas()
          this.runtime.attachCanvas(this.el)
          return
        }
      },

      detachRuntime() {
        if (this.runtime) {
          this.runtime.detachCanvas()
          delete this.runtime
        }
      },

      runtimeAddBlink() {
        this.unsubBlink = observeStore(state => state.widgets.app.selected, (id, state) => {
          this.runtime.blink(getSelectedWidget(state))
        })
      },

      runtimeRemoveBlink() {
        this.unsubBlink && this.unsubBlink()
      },

      loadRuntime(animate) {
        const cached = animateRuntimeStore[animate.id]
        if (cached == null) {
          this.runtime = this.createRuntime(animate)
          this.runtimeAddBlink()
          animateRuntimeStore[animate.id] = { runtime: this.runtime, hash: animate.hash }
        } else {
          this.runtime = cached.runtime
        }
        this.hash = animate.hash
      },

      onRender() {
        const animate = this.getWidget()

        if (animate == null) {
          window.setTimeout(this.drawPlaceholder, 50) // waiting for canvas to resize after draw
          return
        }

        // if we have sources we can load runtime, otherwise draw placeholder
        if (animate.js) {
          this.loadRuntime(animate)
          this.attachRuntime(animate.id)
        } else {
          window.setTimeout(this.drawPlaceholder, 50)
        }

        // declare variables scoped for use in observeStore callback
        const id = animate.id
        const hash = animate.hash

        // watch for animate deletion or hash change
        this.unsubHashChange && this.unsubHashChange()
        this.unsubHashChange = observeStore(state => state.config.animates[id], (animate) => {
          if (animate == null) {
            this.deleteRuntime(id)
            return
          }
          if (animate.js && hash !== animate.hash) {
            this.deleteRuntime(id)
            this.loadRuntime(animate)
            this.attachRuntime(id)
          }
        }, true)
      },

      deleteRuntime(id) {
        if (this.runtime) {
          this.detachRuntime()
          this.unsubHashChange()
          this.runtimeRemoveBlink()
          delete animateRuntimeStore[id]
        }
      },

      destroy() {
        destroy.bind(this)(removeAnimate)
      },

      remove() {
        defaultType.view.prototype.remove.apply(this, arguments)
        // this.detachRuntime()
      }
    })
  })
}