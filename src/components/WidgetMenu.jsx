import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'

import { Grid, Icon } from 'semantic-ui-react'

import {
  addRange,
  addButton,
  addAction,
  addToggle
} from '@actions'

class WidgetMenu extends Component {
  render () {
    return <div id='connect-menu'>
      <Grid centered>
        <Grid.Row centered className='group-title'>
          <Grid.Column width={16}>
            Providers
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered>
          <Grid.Column width={8}>
            <NavLink to='/add/model' className='block'>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g strokeWidth=".08095">
                  <path d="m22.569 19.653h-19.539v-1.4229l0.8435 0.7309 0.88308-0.7309h7.4759l0.8218 0.73 0.88624-0.73h6.92l0.83216 0.72903 0.87652-0.72903z"/>
                  <path d="m6.5804 4.3474h0.10806v1.6881h-0.10806c-0.86948 0-1.4201 0.30186-1.6519 0.90558-0.121 0.31837-0.18151 0.61149-0.18151 0.87669v0.77566h2.5017l-0.61724 1.6872h-1.8843v7.5353l-0.87474 0.70329-0.8133-0.70329v-7.5354h-2.6312l0.6157-1.6872h2.0155v-0.77566c0-1.082 0.39576-1.9974 1.1886-2.7463 0.30379-0.23144 0.62501-0.41001 0.96281-0.53621 0.40621-0.12547 0.86268-0.1878 1.37-0.1878z"/>
                  <path d="m10.565 8.5934c0.98054 0 1.8278 0.3833 2.5429 1.1511 0.6956-0.76773 1.5751-1.1713 2.5997-1.1713 2.8679 0 3.3342 2.4086 3.3342 3.3022v5.0486h-1.6881v-4.897c0-0.78197-0.3939-1.34-1.1807-1.6735-0.21751-0.04824-0.39155-0.07293-0.52156-0.07293-0.69099 0-1.2174 0.35318-1.5795 1.0584-0.08768 0.22682-0.13083 0.51176-0.13083 0.8545v5.6232l-0.88389 0.70118-0.80423-0.70118v-5.8836c0-0.61846-0.2665-1.6525-1.6268-1.6525-1.4661 0-1.7641 1.2535-1.7641 1.667v4.9765h-1.6878l0.00766-4.8619c-9.23e-5 -1.8678 0.92597-3.4688 3.3834-3.4688z"/>
                  <path d="m20.861 11.464v6.3533l0.83143 0.70062 0.87466-0.70062v-6.3533z"/>
                  <path d="m20.863 8.5934h1.706v2.0971h-1.706z"/>
                </g>
              </svg>
              Model
            </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered className='group-title'>
          <Grid.Column width={16}>
            Visualisation
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <NavLink to='/add/animate' className='block'>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m0 0.3v23.4h24v-23.4zm1 1h22v21.4h-22z" clipRule="evenodd" fillRule="evenodd" strokeWidth=".1"/>
                <path d="m6.7 13.54-0.8 2.99c-0.02 0.08-0.05 0.09-0.15 0.09h-1.47c-0.1 0-0.12-0.03-0.1-0.15l2.85-9.96c0.05-0.18 0.08-0.29 0.1-0.79 0-0.07 0.03-0.1 0.08-0.1h2.1c0.07 0 0.1 0.02 0.12 0.1l3.19 10.77c0.02 0.08 0 0.13-0.08 0.13h-1.65c-0.08 0-0.13-0.01-0.15-0.07l-0.83-3.01zm2.79-1.65c-0.28-1.11-0.94-3.52-1.19-4.7h-0.02c-0.21 1.17-0.74 3.14-1.16 4.7zm4.07-1.75c0-0.1 0-0.45-0.05-1.03 0-0.07 0.02-0.08 0.09-0.12 0.84-0.31 1.94-0.66 3.08-0.66 1.41 0 2.95 0.55 2.95 2.96v5.2c0 0.1-0.03 0.13-0.12 0.13h-1.5c-0.1 0-0.13-0.05-0.13-0.13v-5.06c0-0.96-0.34-1.49-1.33-1.49-0.43 0-0.84 0.08-1.13 0.18v6.39c0 0.07-0.03 0.12-0.1 0.12h-1.63c-0.08 0-0.12-0.03-0.12-0.12v-6.37z" clipRule="evenodd" fillRule="evenodd" strokeWidth=".1"/>
              </svg>
              Animate
            </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered className='group-title'>
          <Grid.Column width={16}>
            Controls
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <NavLink to='/' className='block' onClick={this.props.addRange}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,-290.65)">
                  <path d="m-2.061e-4 299.39v2.0587h0.62853v-0.56519h7.1023l-1.9181 1.5969v2.293c0 0.38867 0.31304 0.70188 0.70187 0.70188h2.4325c0.38884 0 0.70187-0.31296 0.70187-0.70188v-2.293l-1.9181-1.597h15.77v0.5652h0.49954v-2.0587h-0.49954v0.61206h-22.872v-0.61206z"/>
                </g>
              </svg>
              Range
            </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>
            <NavLink to='/' className='block' onClick={this.props.addButton}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(0,-290.65)">
                  <rect x=".7204" y="298.89" width="22.559" height="7.5197" ry="1.7236" fill="none" stroke="#FFF" strokeLinejoin="bevel" strokeWidth=".71612"/>
                  <g strokeWidth=".94737" aria-label="OK">
                    <path d="m10.315 304.45q-0.30933 0-0.57067-0.12266-0.256-0.128-0.44267-0.36267-0.18133-0.23467-0.28267-0.57067-0.10133-0.336-0.10133-0.76266 0-0.42667 0.10133-0.75734 0.10133-0.336 0.28267-0.56 0.18667-0.22933 0.44267-0.34666 0.26133-0.12267 0.57067-0.12267 0.30933 0 0.56533 0.12267 0.26133 0.11733 0.44267 0.34666 0.18667 0.22934 0.288 0.56534 0.10133 0.33066 0.10133 0.752 0 0.42666-0.10133 0.76266-0.10133 0.336-0.288 0.57067-0.18133 0.23467-0.44267 0.36267-0.256 0.12266-0.56533 0.12266zm0-0.67733q0.272 0 0.432-0.304 0.16-0.30933 0.16-0.83733 0-0.52267-0.16-0.816-0.16-0.29334-0.432-0.29334t-0.432 0.29334q-0.16 0.29333-0.16 0.816 0 0.528 0.16 0.83733 0.16 0.304 0.432 0.304z"/>
                    <path d="m12.277 300.91h0.79467v1.424h0.016l1.0293-1.424h0.864l-1.04 1.3867 1.1413 2.0907h-0.86933l-0.736-1.4667-0.40533 0.53333v0.93333h-0.79467z"/>
                  </g>
                </g>
              </svg>
              Button
            </NavLink>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <NavLink to='/' className='block' onClick={this.props.addToggle}>
              <svg className="gjs-block-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(.022189 0 0 .022189 -19.31 -4.5857)">
                  <path d="m925.14 747.47c0-34.759 6.7843-67.927 20.437-99.587 13.652-31.66 31.828-58.881 54.694-81.747 22.866-22.866 50.087-41.041 81.747-54.694 31.66-13.652 64.828-20.437 99.588-20.437h458.8c34.759 0 67.927 6.7843 99.588 20.437 31.66 13.652 58.881 31.828 81.747 54.694 22.866 22.866 41.041 50.087 54.694 81.747 13.652 31.66 20.521 64.828 20.521 99.587 0 34.759-6.7844 67.927-20.437 99.587-13.652 31.66-31.828 58.881-54.694 81.747-22.866 22.866-50.087 41.041-81.747 54.694-31.66 13.652-64.828 20.437-99.587 20.437h-458.8c-34.759 0-67.927-6.7843-99.587-20.437-31.66-13.652-58.881-31.828-81.747-54.694-22.866-22.866-41.041-50.087-54.694-81.747s-20.521-64.828-20.521-99.587zm715.35 205.21c27.807 0 54.275-5.4442 79.569-16.249 25.211-10.805 47.072-25.462 65.498-43.889 18.427-18.427 33.084-40.287 43.889-65.498s16.249-51.762 16.249-79.569c0-27.807-5.4442-54.275-16.249-79.569-10.805-25.211-25.462-47.072-43.889-65.498-18.427-18.427-40.287-33.084-65.498-43.889-25.211-10.805-51.762-16.249-79.569-16.249-27.808 0-54.275 5.4442-79.57 16.249-25.211 10.805-47.072 25.462-65.498 43.889-18.427 18.427-33.084 40.287-43.889 65.498s-16.249 51.762-16.249 79.569c0 27.807 5.4442 54.275 16.249 79.569 10.805 25.211 25.462 47.072 43.889 65.498 18.427 18.427 40.287 33.084 65.498 43.889 25.211 10.805 51.762 16.249 79.57 16.249z" strokeWidth=".83757"/>
                </g>
              </svg>
              Toggle
            </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row centered className='group-title'>
          <Grid.Column width={16}>
            Meta
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={8}>
            <NavLink to='/' className='block' onClick={this.props.addAction}>
              <Icon name='code' />
              Action
            </NavLink>
          </Grid.Column>
          <Grid.Column width={8}>
          </Grid.Column>
        </Grid.Row>
      </Grid>

    </div>
  }
}

export default connect(
  state => ({ }),
  dispatch => bindActionCreators({
    addRange,
    addButton,
    addAction,
    addToggle
  }, dispatch)
)(WidgetMenu)
