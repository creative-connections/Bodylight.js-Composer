class Widget { }

export default class Label extends Widget {
  constructor (configuration) {
    super(configuration, 'label')
    this.component.htmlFor = this.for
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
        const label = this.label
        let value = label.function ? label.function(label.value) : label.value
        if (this.component.innerHTML !== value) {
          this.component.innerHTML = value
        }
      }
    }
  }
}
