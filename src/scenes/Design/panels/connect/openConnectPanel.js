const $ = require('backbone').$

module.exports = {
  run (editor, sender) {
    this.sender = sender
    this.toggle = this.toggle.bind(this)

    const panels = editor.Panels

    let viewsContainer
    if (!panels.getPanel('views-container')) {
      viewsContainer = panels.addPanel({ id: 'views-container' })
    } else {
      viewsContainer = panels.getPanel('views-container')
    }

    if (!this.$div) {
      this.$div = $('<div id="connect-panel"></div>')

      viewsContainer.set(
        'appendContent', this.$div.get(0)
      ).trigger('change:appendContent')

      this.target = editor.getModel()
      this.listenTo(this.target, 'component:toggled', this.toggle)
    }

    this.toggle()
  },

  toggle () {
    const sender = this.sender
    if (sender && sender.get && !sender.get('active')) {
      return
    }

    // if there is a block selected
    if (this.target.getSelectedAll().length === 1) {
      this.$div.show()
    } else {
      this.$div.hide()
    }
  },

  stop () {
    this.$div && this.$div.hide()
  }
}
