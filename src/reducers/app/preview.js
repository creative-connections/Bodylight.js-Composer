import {
  SHOW_PREVIEW,
  HIDE_PREVIEW
} from '@actions/types'


export default function (state = false, action) {

  switch (action.type) {
  case SHOW_PREVIEW:
    state = true
    break
  case HIDE_PREVIEW:
    state = false
    break
  }
  return state
}

export const getPreview = state => state
