/* global widgets */
/* global models */
/* global ValueProviderType */

export default function resolveValueProviders () {
  const resolve = id => {
    const provider = JSON.parse(id)
    if (provider.type === ValueProviderType.MODEL_PARAMETER ||
        provider.type === ValueProviderType.MODEL_VARIABLE) {
      const target = models[provider.parent]
      const name = provider.name
      return { target, name }
    }
  }

  widgets.forEach(widget => {
    const providers = widget.getValueProviders()
    const resolved = []
    Object.entries(providers).forEach(([attribute, id]) => {
      const {target, name} = resolve(id)
      resolved[attribute] = {target, name}
    })
    widget.setValueProviders(resolved)
  })
}
