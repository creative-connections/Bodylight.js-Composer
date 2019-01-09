import attrsToString from '../attrsToString'
export default (editor, opt = {}) => {
  const classes = opt.classes
  const attr = opt.attr.item

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
      <style> ${opt.styles} </style>
    `
  },
  ...opt.flexboxBlock
  })
}
