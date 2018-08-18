class Widget { }

export default class Button extends Widget {
  constructor (configuration) {
    super(configuration, 'button')

    this.handleOnClick = this.handleOnClick.bind(this)
    this.handleOnPress = this.handleOnPress.bind(this)
    this.handleOnRelease = this.handleOnRelease.bind(this)

    if (this.mode === 'press') {
      this.component.addEventListener('mousedown', this.handleOnPress)
      this.component.addEventListener('keydown', this.handleOnPress)
      this.component.addEventListener('mouseup', this.handleOnRelease)
      this.component.addEventListener('keyup', this.handleOnRelease)
    } else if (this.mode === 'click') {
      this.component.addEventListener('click', this.handleOnClick)
    }

    this.addValueProvider('target', this.target.provider)
  }

  handleOnClick () {
    this.target.provider.setValue(this.target.reference, this.onClick.value)
  }

  handleOnPress () {
    this.target.provider.setValue(this.target.reference, this.onPress.value)
  }

  handleOnRelease () {
    this.target.provider.setValue(this.target.reference, this.onRelease.value)
  }

  generateSetters () {
    this.setters = {
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
      label: () => {
        if (this.label.function === null) {
          this.component.innerHTML = this.label.value
          return
        }
        this.component.innerHTML = this.label.function(this.label.value)
      },
      onClick: () => {
        if (this.onClick.function !== null) {
          this.onClick.value = this.onClick.function(this.onClick.value)
        }
      },
      onPress: () => {
        if (this.onPress.function !== null) {
          this.onPress.value = this.onPress.function(this.onPress.value)
        }
      },
      onRelease: () => {
        if (this.onRelease.function !== null) {
          this.onRelease.value = this.onRelease.function(this.onRelease.value)
        }
      }
    }
  }

  setValueProvider (attribute, name, target) {
    if (attribute === 'target') {
      this.target.reference = target.registerValueSetter(name)
      this.target.provider = target
      return
    }
    super.setValueProvider(attribute, name, target)
  }
}
