'use strict'
import React from 'react'
import {render} from 'react-dom'
import { Provider } from 'react-redux'
import Routes from './Routes'

import store from './store'
import Root from './components/Root'


render (
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('main')
)