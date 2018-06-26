/**
 *  Created by daiwenjuan on 2018/6/26 下午6:20.
 */
import { createStore } from 'redux'
import myApp from './reducers'

const store = createStore(myApp)
module.exports = store