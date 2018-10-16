import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore from '@src/configureStore'
import generateID from '@helpers/generateID'
import Connect from '@scenes/Connect'

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

      this.render(
        configureStore(() => {
          console.log('callback, store changed')
          render(configureStore())
        })
      )

      this.target = editor.getModel()
      this.listenTo(this.target, 'component:toggled', this.toggle)
    }
    this.$div.show()
  },

  render ({store, persistor}) {
    ReactDOM.render(
      <Provider store={store} key={generateID()}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Route
              path={`${process.env.PATH}/`}
              render={(props) => { return <Connect sidebar={true} {...props} /> }}
            />
          </Router>
        </PersistGate>
      </Provider>,
      this.$div[0]
    )
  },

  toggle () {
    const sender = this.sender
    if (sender && sender.get && !sender.get('active')) {
      return
    }

    this.$div.show()
  },

  stop () {
    this.$div && this.$div.hide()
  }
}
