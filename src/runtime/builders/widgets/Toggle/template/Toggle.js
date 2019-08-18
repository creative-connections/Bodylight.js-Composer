class Widget { }

export default class Toggle extends Widget {
  constructor (configuration) {
    super(configuration, 'toggle')

    this.handleOnChange = this.handleOnChange.bind(this)
    this.component.addEventListener('change', this.handleOnChange)

    if (this.target.value != null) {
      this.component.checked = this.target.value
    }

    this.addValueProvider('target', this.target.provider)
  }

  getValue() {
    return this.component.checked
  }

  handleOnChange () {
    if (this.constructed == null) { return }
    if (this.component.checked) {
      if (this.target.provider !== null) {
        this.target.provider.setValue(this.target.reference, this.onToggleOn.value)
      }
      this.dispatchEvent(new Event('toggleOn'))
    } else {
      if (this.target.provider !== null) {
        this.target.provider.setValue(this.target.reference, this.onToggleOff.value)
      }
      this.dispatchEvent(new Event('toggleOff'))
    }
    this.dispatchEvent(new Event('change'))
  }

  generateSetters () {
    this.setters = {
      target: () => {
        if (this.target.value != this.component.checked) {
          this.component.checked = this.target.value
          this.handleOnChange()
        }
      },
      enabled: () => {
        if (this.enabled.function === null) {
          this.component.disabled = !this.enabled.value
          return
        }
        this.component.disabled = !this.enabled.function(this.enabled.value)
      },
      visible: () => {
        if (this.visible.function === null) {
          this.component.hidden = !this.visible.value
          return
        }
        this.component.hidden = !this.visible.function(this.visible.value)
      },
      onToggleOn: () => {
        if (this.onToggleOn.function !== null) {
          this.onToggleOn.value = this.onToggleOn.function(this.onToggleOn.value)
        }
      },
      onToggleOff: () => {
        if (this.onToggleOff.function !== null) {
          this.onToggleOff.value = this.onToggleOff.function(this.onToggleOff.value)
        }
      }
    }
  }

  setValueProvider (attribute, id, target) {
    if (attribute === 'target') {
      this.target.reference = target.registerValueSetter(this, id, attribute)
      this.target.provider = target
      target.registerValueListener(this, id, attribute)
      return
    }
    super.setValueProvider(attribute, id, target)
  }
}
