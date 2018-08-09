import configureStore from '@src/configureStore'
import AnimateRuntime from '@helpers/Animate/Runtime'

import { ANIMATE_CANVAS, ANIMATE_ID } from '../types.js'

export default (editor) => {
  const components = editor.DomComponents
  const defaultType = components.getType('default')
  const defaultModel = defaultType.model

  components.addType(ANIMATE_CANVAS, {
    model: defaultModel.extend({
    // Extend default properties
      defaults: Object.assign({}, defaultModel.prototype.defaults, {
        draggable: '*',
        droppable: false,
        tagName: 'canvas',
        classes: [ANIMATE_CANVAS],
        traits: [{
          type: ANIMATE_ID,
          label: 'Animate',
          name: 'name'
        }]
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
        changeName: 'handleChangeName'
      },

      clearCanvas () {
        this.el.getContext('2d').clearRect(0, 0, this.el.width, this.el.height)
      },

      /* On name change our Animate provider has changed, we need to redraw it in the editor */
      handleChangeName () {
        this.drawAnimate(this.el.getAttribute('name'))
      },

      drawPlaceholder () {
        const ctx = this.el.getContext('2d')
        ctx.font = '25px serif'
        ctx.fillText('Animate - not selected', 50, 50)
      },

      drawAnimate (name) {
        const state = configureStore().store.getState()

        // we have to clear previously running runtime, if we want to redraw
        if (typeof this.runtime !== 'undefined') {
          this.runtime.destroy()
          delete this.runtime
        }

        this.clearCanvas()

        // if we don't have a valid animate name, we draw a placeholder instead
        if (typeof name === 'undefined' || name === null || name === '' ||
            typeof state.animates[name] === 'undefined') {
          return this.drawPlaceholder()
        }

        const source = state.animates[name].source
        this.runtime = new AnimateRuntime(source, name)
        this.runtime.init(this.el, false, true).then()
      },

      render () {
        defaultType.view.prototype.render.apply(this, arguments)
        console.log('render')
        this.drawAnimate(this.attr.name) // draw canvas
        return this
      }

    })

  })

  return ANIMATE_CANVAS
}
