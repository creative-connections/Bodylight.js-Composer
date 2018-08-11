import { SELECT_WIDGET } from '@actions/types'
import update from 'immutability-helper'

export default function (state = '', action) {
  switch (action.type) {
    case SELECT_WIDGET:
      return action.payload
  }

  return state
}
