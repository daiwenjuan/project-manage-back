/**
 *  Created by daiwenjuan on 2018/6/25 下午2:37.
 */
import React from 'react'
import { render } from 'react-dom'
import { Router, match, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from './routes'
import configureStore from './configureStore'

let store = configureStore(window.config.REDUX_STATE)
match({history: browserHistory, routes}, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <Router {...renderProps}/>
    </Provider>,
    document.getElementById('root')
  )
})
