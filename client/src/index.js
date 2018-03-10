import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import decode from 'jwt-decode'

import './styles/index.scss'

import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
import Dashboard from './components/Dashboard'
import NotFoundPage from './components/NotFoundPage'

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

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        checkAuth() ? (
            <Component {...props} /> 
        ) : (
            <Redirect to={{ pathname: '/login' }} />
        )
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
