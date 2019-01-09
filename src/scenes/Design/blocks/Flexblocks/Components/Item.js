import attrsToString from '../attrsToString'
import generateClasses from '../classes'

export default (editor, opt = {}) => {
  const stylePrefix = opt.stylePrefix
  const classes = generateClasses(stylePrefix)

  const keyWidth = 'flex-basis'
  const step = 0.2
  const minDim = 1
  const currentUnit = 1
  const resizer = {
    tl: 0, tc: 0, tr: 0, cl: 0, bl: 0, br: 0, cr: 1, bc: 1, keyWidth, currentUnit, minDim, step
  }

  const attr = {
    class: classes.item,
    'data-gjs-draggable': `.${classes.columnContainer}, .${classes.rowContainer}`,
    'data-gjs-resizable': resizer,
    'data-gjs-custom-name': 'Row / Column',
  }

  editor.on('selector:add', selector => {
    `.${classes.item}` === selector.getFullName() && selector.set('private', 1)
  })

  const label = 'Row / Column'
  const category = 'Basic'

  editor.BlockManager.add('flexblocks-item', { ...{
    label,
    category,
    attributes: { class: 'gjs-fonts gjs-f-b1' },
    content: `
      <div ${attrsToString(attr)}></div>
      <style>
        .${classes.item} {
          flex-basis: auto;
          flex-grow: 1;
        }
      </style>
    `
  },
  ...opt.flexboxBlock
  })
}
