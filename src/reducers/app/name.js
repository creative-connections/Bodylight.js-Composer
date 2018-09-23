import { RENAME_PROJECT } from '@actions/types'

export default function (state = 'unnamed_project', action) {
  switch (action.type) {
    case RENAME_PROJECT:
      state = action.payload
  }
  return state
}
