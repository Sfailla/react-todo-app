import React from 'react'
import ReactDOM from 'react-dom'
import decode from 'jwt-decode'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import './styles/index.scss'

import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import NotFoundPage from './pages/NotFoundPage'

import registerServiceWorker from './registerServiceWorker'

const checkAuth = () => {
    const token = localStorage.getItem('TOKEN')
    if (!token) {
        return false
    }
    try {
        const { exp } = decode(token)
        if (exp > new Date().getTime() / 1000) {
            return false
        }
    } catch(e) {
        return false
    }
    return true
}
// HOC for Authenticated
const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? <Component {...props} /> : <Redirect to={{ pathname: '/login' }} />
    )} />
)

const routes = (
    <Router>
        <Switch>
            <Route exact path='/' component={RegisterPage} />
            <Route exact path='/login' component={LoginPage} />
            <AuthRoute exact path='/dashboard' component={Dashboard} />
            <Route component={NotFoundPage} />
        </Switch>        
    </Router>
)


ReactDOM.render(routes, document.getElementById('root'))
registerServiceWorker()
