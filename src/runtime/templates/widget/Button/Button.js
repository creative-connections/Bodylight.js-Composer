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

    // event triggers
    this.triggerPress = this.triggerPress.bind(this)
    this.triggerRelease = this.triggerRelease.bind(this)
    this.triggerClick = this.triggerClick.bind(this)

    this.component.addEventListener('mousedown', this.triggerPress)
    this.component.addEventListener('keydown', this.triggerPress)
    this.component.addEventListener('mouseup', this.triggerRelease)
    this.component.addEventListener('keyup', this.triggerRelease)
    this.component.addEventListener('click', this.triggerClick)

    this.addValueProvider('target', this.target.provider)
  }

  triggerPress () {
    this.dispatchEvent(new Event('press'))
  }

  triggerRelease () {
    this.dispatchEvent(new Event('release'))
  }

  triggerClick () {
    this.dispatchEvent(new Event('click'))
  }

  handleOnClick () {
    if (this.target.provider !== null) {
      this.target.provider.setValue(this.target.reference, this.onClick.value)
    }
  }

  handleOnPress () {
    if (this.target.provider !== null) {
      this.target.provider.setValue(this.target.reference, this.onPress.value)
    }
  }

  handleOnRelease () {
    if (this.target.provider !== null) {
      this.target.provider.setValue(this.target.reference, this.onRelease.value)
    }
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

  setValueProvider (attribute, id, target) {
    if (attribute === 'target') {
      this.target.reference = target.registerValueSetter(id)
      this.target.provider = target
      return
    }
    super.setValueProvider(attribute, id, target)
  }
}
