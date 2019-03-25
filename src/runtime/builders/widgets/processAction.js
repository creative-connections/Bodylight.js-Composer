import update from 'immutability-helper'
import ArgumentType from '@enum/ArgumentType'

export default (action) => {
  let args = ''
  for (let i = 0; i < action.args.length; i++) {
    const arg = action.args[i]

    if (arg === undefined || arg === null) {
      args += `null`
    } else {
      switch (arg.type) {
      case ArgumentType.MODEL:
        args += `getModelByID('${action.args[i].value}')`
        break
      case ArgumentType.ANIMATE_ANIM:
        args += `getAnimateAnimByID('${action.args[i].value}')`
        break
      case ArgumentType.ANIMATE_TEXT:
        args += `getAnimateTextByID('${action.args[i].value}')`
        break
      case ArgumentType.BUTTON:
        args += `getButtonByID('${action.args[i].value}')`
        break
      case ArgumentType.RANGE:
        args += `getRangeByID('${action.args[i].value}')`
        break
      case ArgumentType.TOGGLE:
        args += `getToggleByID('${action.args[i].value}')`
        break
      case ArgumentType.CHART:
        args += `getChartByID('${action.args[i].value}')`
        break
      }
    }

    if (i + 1 !== action.args.length) {
      args += ','
    }
  }
  const fn = `function() { config.actions['${action.action}'].bind(this)(${args}) }`
  const fun = new Function(`return ${fn}`)()

  // we don't need the additional 'args' and 'action' metadata
  return update(action, {
    function: { $set: fun },
    $unset: ['action', 'args']
  })
}