/* global widgets */
/* global models */
/* global ValueProviderType */

export default function resolveValueProviders () {
  widgets.forEach(widget => {
    const valueProviderID = widget.getValueProvider()
    const valueProvider = JSON.parse(valueProviderID)
    if (valueProvider.type === ValueProviderType.MODEL_PARAMETER ||
        valueProvider.type === ValueProviderType.MODEL_VARIABLE) {
      const model = models[valueProvider.parent]
      widget.setValueProvider(model, valueProvider.name)
    }
  })
}
