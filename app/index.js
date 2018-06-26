/**
 *  Created by daiwenjuan on 2018/6/25 下午2:37.
 */
import app from './main'
import ReactDOM from 'react-dom'
import React from 'react'
import { Provider, connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, bindActionCreators } from 'redux'
import myApp from './reducers'
let store = createStore(myApp)

function changeText() {
  return {
    type: 'CHANGE_TEXT'
  }
}
function mapStateToProps(state, props) {
  return { text: state.text }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ changeText: changeText }, dispatch)
  }
}
let App = connect(mapStateToProps, mapDispatchToProps)(app)

ReactDOM.render(
  <Provider store={store}>
    <Router >
      <Route path="/home" component={App}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)