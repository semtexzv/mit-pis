import React, { PureComponent } from 'react'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider'
import MomentUtils from 'material-ui-pickers/utils/moment-utils'
import thunk from 'redux-thunk'
import rest from 'api/rest'
import { revalidateToken } from 'actions/AuthProcedures'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import * as tools from 'lib/tools'
import { tokenRememberExpirationMinutes } from 'config'

// routing
import { Route, Switch, withRouter } from 'react-router'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
import routeConfig from 'routeConfig'

// alert system
import Alert from 'react-s-alert'
import 'react-s-alert/dist/s-alert-default.css'
import 'react-s-alert/dist/s-alert-css-effects/slide.css'

// design & theme
import theme from 'themes/darkTheme'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
// import injectTapEventPlugin from 'react-tap-event-plugin'
// injectTapEventPlugin()

// pages
import Wrapper from 'containers/Wrapper'
import Login from 'containers/pages/Login'

// reducers
import * as reducers from './reducers'
const reducer = combineReducers({
  ...reducers,
  rest: rest.reducers,
  router: routerReducer,
  auth: reducers.authReducer
})

// create store
const routingMiddleware = routerMiddleware(history)
const createStoreWithMiddleware = applyMiddleware(
  thunk.withExtraArgument(rest),
  routingMiddleware)(createStore)
export const store = createStoreWithMiddleware(reducer)

// pre-authed request
let hash = window.location.hash
if (hash) {
  let hashinfo = hash.match(/token=([a-f0-9]+)(,(\w+))?/i)
  if (hashinfo !== null) {
    let token = hashinfo[1]
    let action = hashinfo.length > 3 ? hashinfo[3] : ''
    console.log('pre-auth')
    tools.setCookie('AuthToken', token, tokenRememberExpirationMinutes)
    revalidateToken(token, action)
  }
} else {
  // attempt to re-auth
  let activeToken = tools.getCookie('AuthToken')
  if (activeToken) revalidateToken(activeToken)
}

const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: state => !!state.auth.token,
  authenticatingSelector: state => state.dataSyncing.auth || state.dataSyncing.me,
  wrapperDisplayName: 'UserIsAuthenticated'
})
// this does NOT work (autoredir on login if logged in) -> solved rather manually
// export const userIsNotAuthenticated = connectedRouterRedirect({
//   redirectPath: '/',
//   authenticatedSelector: state => !state.auth.token,
//   authenticatingSelector: state => state.dataSyncing.auth || state.dataSyncing.me,
//   wrapperDisplayName: 'UserIsNotAuthenticated',
//   allowRedirectBack: false,
//   redirectQueryParamName: ''
// })
const Authenticated = withRouter(userIsAuthenticated((props) => React.cloneElement(props.children, props)))
// const NotAuthenticated = withRouter(userIsNotAuthenticated((props) => React.cloneElement(props.children, props)))
const routes = (
  <Switch>
    {/* <NotAuthenticated> */}
    {/* <Switch> */}
    <Route path="/login" component={Login} />
    {/* </Switch> */}
    {/* </NotAuthenticated> */}
    <Authenticated>
      <Switch>
        {routeConfig.map(route => (<Route key={route.route} exact={route.exactMatch} path={route.route} component={route.component} />))}
      </Switch>
    </Authenticated>
  </Switch>
)

// application root component
export default class App extends PureComponent {
  counter = 0

  render() {
    // hack proti otravnému warningu
    if (module.hot) {
      this.counter++
      module.hot.accept()
    }
    return (
      <MuiThemeProvider theme={createMuiTheme(theme)}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Provider store={store}>
            <ConnectedRouter history={history} key={this.counter}>
              <Wrapper>
                {routes}
                <Alert stack={{ limit: 6 }} />
              </Wrapper>
            </ConnectedRouter>
          </Provider>
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    )
  }

  componentDidMount() {
  }
}
