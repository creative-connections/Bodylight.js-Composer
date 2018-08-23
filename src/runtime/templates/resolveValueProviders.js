/* global widgets */
/* global models */
/* global ProviderType */

export default function resolveValueProviders () {
  const resolve = id => {
    const provider = JSON.parse(id)
    if (provider.type === ProviderType.MODEL_PARAMETER ||
        provider.type === ProviderType.MODEL_VARIABLE) {
      const target = models[provider.parent]
      if (target === null) {
        return null
      }
      const name = provider.name
      return { target, name }
    }
  }

  widgets.forEach(widget => {
    const providers = widget.getValueProviders()
    const resolved = []
    Object.entries(providers).forEach(([attribute, id]) => {
      resolved[attribute] = resolve(id)
    })
    widget.setValueProviders(resolved)
  })
}
