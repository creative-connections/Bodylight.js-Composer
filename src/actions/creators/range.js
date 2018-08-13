import {
  ADD_RANGE,
  RENAME_RANGE,
  REMOVE_RANGE
} from '@actions/types'

export const addRange = name => ({
  type: ADD_RANGE,
  payload: {name: name}
})

export const renameRange = (range, newname) => ({
  type: RENAME_RANGE,
  payload: { range, newname }
})

export const removeRange = range => ({
  type: REMOVE_RANGE,
  payload: { range }
})
