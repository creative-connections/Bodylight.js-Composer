const ArgumentType = {
  MODEL: 'model'
}

export default ArgumentType

export const argumentTypeToTypeof = type => {
  switch (type) {
    case ArgumentType.MODEL: {
      return 'string'
    }
  }
}
