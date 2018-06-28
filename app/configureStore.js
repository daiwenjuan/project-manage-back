/**
 *  Created by daiwenjuan on 2018/6/26 下午6:20.
 */
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import reducers from './reducers/index'

export default function configureStore(preloadedState) {
  return createStore(reducers, preloadedState, applyMiddleware(logger))
}

