/**
 *  Created by daiwenjuan on 2018/6/26 下午6:20.
 */
import { createStore } from 'redux'
import reducers from './reducers/index'

export default function configureStore(preloadedState) {
  return createStore(reducers, preloadedState)
}

