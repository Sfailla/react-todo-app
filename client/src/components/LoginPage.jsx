import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import Authorize from '../utils/MyAuth'

import LoginForm from './Login-Form'
import TextComponent from './TextComponent';


export default class LoginPage extends Component {
    static defaultProps = {
        subtitle: ['-This is the login page for the Todo App, in this app you will be able to create, update, read, or delete todos from a list. enjoy!!', '-If you are logged in the dashboard button will be enabled and you can click it to get back to dashboard' ]
    }
    state = {
        email: '',
        password: '',
        errors: '',
        redirectTo: false
    }

    Authorize = new Authorize()

    handleOnSubmit = (event) => {
        event.preventDefault()

        console.log(this.state.email)
        console.log(this.state.password)
        const { login } = this.Authorize
        const { email, password } = this.state
        login(email, password)
        try {
            setTimeout(() => { this.handleRedirect() }, 500)
        } catch (e) {

        }
    }

    handleOnChange = (event) => {
        const { name, value } = event.target
        this.setState(() => ({ [name]: value }))
    }

    handleRedirect = () => {
        const { isLoggedIn } = this.Authorize
        try {
            if (isLoggedIn()) {
                console.log(isLoggedIn())
                setTimeout(() => { this.setState(() => ({ redirectTo: true })) })
            }
        } catch (e) {
            // errors?
        }
    }

    render() {
        const { redirectTo } = this.state
        if (redirectTo) {
            return (
                <Redirect to={{ pathname: '/dashboard' }} />
            )
        }
        return (
            <div className="App-Layout login">
                <div className="login--left-box">
                    <TextComponent 
                        title="LOGIN PAGE"
                        subtitle={this.props.subtitle}
                        needButton={false}
                        footerMessage="...You're almost there. Login to get started!" />
                </div>
                <div className="login--right-box">
                    <h2 className="Form-Type">Please enter email and password to login</h2>
                    <LoginForm
                        handleOnSubmit={this.handleOnSubmit}
                        handleOnChange={this.handleOnChange}
                        handleRedirect={this.handleRedirect}
                        email={this.state.email}
                        password={this.state.password}
                        errors={this.state.errors}
                        redirectTo={this.state.redirectTo} />
                    <p style={{ textAlign: 'center' }}>Are you registered? if not click <a href="/">here</a></p>
                </div>
            </div>
        )
    }

}