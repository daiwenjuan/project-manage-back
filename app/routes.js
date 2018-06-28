/**
 *  Created by daiwenjuan on 2018/6/26 下午6:14.
 */
if (typeof require.ensure !== 'function') {
  require.ensure = function (dependencies, callback) {
    callback(require)
  }
}

const routes = {
  childRoutes: [
    {
      path: '/',
      component: require('./app'),
      indexRoute: {
        getComponent (nextState, callback) {
          require.ensure([], require => {
            callback(null, require('./home/index'))
          })
        }
      },
      childRoutes: []
    }
  ]
}
export default routes