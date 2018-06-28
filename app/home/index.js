/**
 *  Created by daiwenjuan on 2018/6/25 上午10:50.
 */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Layout } from 'antd'
const { Header, Content, Footer } = Layout
import actions from '../actions/actions'

class Home extends React.Component {

  render() {
    return <Layout>
      hello World
    </Layout>
  }
}

function mapStateToProps(state) {
  return state
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
