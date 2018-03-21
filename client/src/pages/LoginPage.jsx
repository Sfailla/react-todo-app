import React, { Component } from 'react'

import LoginForm from '../components/Login-Form'
import TextComponent from '../components/TextComponent';

import AlertComponent from '../utils/AlertComponent'
import Authorize from '../utils/MyAuth'


export default class LoginPage extends Component {
    static defaultProps = {
        subtitle: [
            '-This is the login page for the Todo App, in this app you will be able to create, update, read, or delete todos from a list. enjoy!!',
            '-If you are logged in the dashboard button will be enabled and you can click it to get back to dashboard'
        ]
    }
    
    state = {
        email: '',
        password: '',
        success: [],
        errors: [],
        redirectTo: false
    }

    Authorize = new Authorize()

    handleOnSubmit = (event) => {
        event.preventDefault()

        const { login, setToken } = this.Authorize
        const { email, password } = this.state

        if (email && password  !== '') {

            login(email, password)
                .then(res => res.json())
                .then(data => {
                    setToken(data.tokens[0].token)
                    setTimeout(() => { this.props.history.push('/dashboard') }, 300)
                })
                .catch(err => console.log(err));
        } else {
            let error = 'Please fill out the form'
            this.setState((prevState) => ({ errors: [...prevState.errors, error] }))
        }
    }

    handleOnChange = (event) => {
        const { name, value } = event.target
        this.setState(() => ({ [name]: value }))
    }

    render() {
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
                    <h2 className="Form-Type">Enter email and password to login</h2>
                    <a href="/dashboard" className="login__link">
                        <button className="login__dashboard-button" disabled={!this.Authorize.isLoggedIn()} >Dashboard</button>
                    </a>
                    {Array.isArray(this.state.errors) && this.state.errors.map((error, index) => {
                        return <AlertComponent key={index} type="error" errors={error} />
                    })}
                    <LoginForm
                        email={this.state.email}
                        password={this.state.password}
                        errors={this.state.errors}
                        redirectTo={this.state.redirectTo}
                        handleOnSubmit={this.handleOnSubmit}
                        handleOnChange={this.handleOnChange} />
                    <p style={{ textAlign: 'center' }}>Are you registered? if not click <a href="/">here</a></p>
                </div>
            </div>
        )
    }

}