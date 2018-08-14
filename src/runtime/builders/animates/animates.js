import configureStore from '@src/configureStore'
import {
  getAnimates
} from '@reducers'

export default (append, tpl) => {
  const animates = getAnimates(configureStore().store.getState())

  Object.entries(animates).forEach(([name, animate]) => {
    // create function from sources
    let source = Function(`"use strict"; return(${animate.source})`)

    // call source() to get the actual animate source function
    append(`animates.${name} = ${tpl(source())}`)
  })
}
