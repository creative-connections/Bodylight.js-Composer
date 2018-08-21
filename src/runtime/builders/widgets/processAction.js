import update from 'immutability-helper'
import { argumentTypeToTypeof } from '@helpers/enum/ArgumentType'

export default (action) => {
  let args = ''
  for (let i = 0; i < action.args.length; i++) {
    const arg = action.args[i]
    const argTypeof = argumentTypeToTypeof(arg.type)

    if (argTypeof === 'string') {
      args += `'${action.args[i].value}'`
    }

    if (i + 1 !== action.args.length) {
      args += ','
    }
  }

  const fn = `() => config.actions.${action.action}(${args})`
  const fun = new Function(`return ${fn}`)()

  // we don't need the additional 'args' and 'action' metadata
  return update(action, {
    function: { $set: fun },
    $unset: ['action', 'args']
  })
}
