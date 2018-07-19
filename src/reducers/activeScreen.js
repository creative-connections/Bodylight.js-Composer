import { SELECT_SCREEN } from '@actions/types'
import update from 'immutability-helper'

import ActiveScreen from '@helpers/ActiveScreenEnum'

const defaultState = ActiveScreen.CONFIG

export default function (state = defaultState, action) {
  switch (action.type) {
    case SELECT_SCREEN:
      return update(state, {$set: action.payload})
  }

  return state
}
