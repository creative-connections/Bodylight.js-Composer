class Widget { }

export default class Label extends Widget {
  constructor (configuration) {
    super(configuration, 'label')
    this.component.htmlFor = this.for

    this.handleOnClick = this.handleOnClick.bind(this)
    this.triggerClick = this.triggerClick.bind(this)
    this.component.addEventListener('click', this.triggerClick)
  }

  triggerClick () {
    this.dispatchEvent(new Event('click'))
  }

  handleOnClick () {
    if (this.target.provider !== null) {
      this.target.provider.setValue(this.target.reference, this.onClick.value)
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
      onClick: () => {
        if (this.onClick.function !== null) {
          this.onClick.value = this.onClick.function(this.onClick.value)
        }
      },
      label: () => {
        const label = this.label
        let value = label.function ? label.function(label.value) : label.value
        if (this.component.innerHTML !== value) {
          this.component.innerHTML = value
        }
      }
    }
  }
}
