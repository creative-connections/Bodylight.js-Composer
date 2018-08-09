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
          label: 'name',
          name: 'name'
        }]
      })
    }, {
      isComponent: function (el) {
        if (el.tagName === 'CANVAS' && el.classList.contains(ANIMATE_CANVAS)) {
          return {type: ANIMATE_CANVAS}
        }
      }
    }),

    view: defaultType.view.extend({
    })

  })

  return ANIMATE_CANVAS
}
