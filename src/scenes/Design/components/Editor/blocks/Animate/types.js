export const ANIMATE = 'animate-widget'
export const ANIMATE_NAME = 'animate-widget-name-trait'

export const ANIMATE_PREFIX = 'animate-'

export const addPrefix = name => {
  return `${ANIMATE_PREFIX}${name}`
}

export const stripPrefix = name => {
  if (name === undefined) {
    return undefined
  }
  return name.substring(ANIMATE_PREFIX.length)
}
