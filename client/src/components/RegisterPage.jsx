import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import RegisterForm from './Register-Form'
import TextComponent from './TextComponent'

import Authorize from '../utils/MyAuth'

export default class RegisterPage extends Component {
    static defaultProps = {
        subtitle: [
            '-this is a todo app that displays an express backend api and authentication using web tokens',
            '-to get started just register and then you will have access to the todo app',
            '-if you already registered than just click on the login button below to go straight to the app'
        ]
    }

    state = {
        email: '',
        password: '',
        confPassword: '',
        errors: [],
        redirectTo: false
    }

    Authorize = new Authorize()

    handleOnSubmit = (event) => {
        event.preventDefault()

        const { email, password } = this.state
        // this handles the registration
        this.Authorize.register(email, password)
        try {
            setTimeout(() => { this.handleRedirect() }, 500)
        }
        catch (e) {
            // error?
        }
    }

    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState(() => ({ [name]: value }))
    }

    handleRedirect = () => {
        const { isLoggedIn } = this.Authorize
        try {
            if (isLoggedIn()) {
                this.setState(() => ({ redirectTo: true }))
            }
        } catch (e) {
            // errors?
        }
    }

    render() {
        
        if (this.state.redirectTo) {
            return (
                <Redirect to={{ pathname: '/dashboard' }} />
            )
        } 
        return (
            <div className="App-Layout register">
                <div className="register--left-box">
                    <TextComponent
                        {...this.props}
                        title='TODO APP'
                        needButton="LOGIN"
                        location="/login"
                        footerMessage="Copywrite Steven Failla 2018" />
                </div>
                <div className="register--right-box">
                    <h1 className="Form-Type register__right-title">Register Here</h1>
                    <RegisterForm {...this.props}
                        email={this.state.email}
                        errors={this.state.errors}               
                        password={this.state.password}
                        confPassword={this.state.confPassword} 
                        handleOnChange={this.handleOnChange}
                        handleRedirect={this.handleRedirect} />
                    <p style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>already registered? click <a href="/login" style={{ textDecoration: 'none' }}>here</a> to login</p>
                </div>
            </div>
        )
    }
}
