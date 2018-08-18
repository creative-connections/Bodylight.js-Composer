export const BUTTON = 'button-widget'
export const BUTTON_NAME = 'button-widget-name-trait'

export const BUTTON_PREFIX = 'button-'

export const addPrefix = name => {
  return `${BUTTON_PREFIX}${name}`
}

export const stripPrefix = name => {
  if (name === undefined) {
    return undefined
  }
  return name.substring(BUTTON_PREFIX.length)
}
