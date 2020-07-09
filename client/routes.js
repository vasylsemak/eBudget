import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AccountOverview from './components/account-overview'
import PlaidLogin from './components/link'
import Charts from './components/Charts'
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, plaidAccessToken} = this.props

    return (
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />

        {isLoggedIn &&
          plaidAccessToken !== null && (
            <Switch>
              <Route exact path="/home" component={UserHome} />
              <Route path="/overview" component={AccountOverview} />
              <Route path="/charts" component={Charts} />
            </Switch>
          )}
        {isLoggedIn &&
          plaidAccessToken === null && (
            <Switch>
              <Route component={PlaidLogin} />
            </Switch>
          )}
        {/* Displays our Login component as a fallback */}
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    plaidAccessToken: state.user.plaidAccessToken
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
