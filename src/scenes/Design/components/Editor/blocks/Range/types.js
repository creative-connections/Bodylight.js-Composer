export const RANGE = 'range-widget'
export const RANGE_NAME = 'range-widget-name-trait'

export const RANGE_PREFIX = 'range-'

export const addPrefix = name => {
  return `${RANGE_PREFIX}${name}`
}

export const stripPrefix = name => {
  if (name === undefined) {
    return undefined
  }
  return name.substring(RANGE_PREFIX.length)
}
