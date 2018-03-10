import React, { Component } from 'react'

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
        const { register, setToken } = this.Authorize
        // this handles the registration
        register(email, password)
            .then(res => res.json())
            .then(data => {
                setToken(data.tokens[0].token)
                setTimeout(() => { 
                    this.props.history.push('/dashboard')
                }, 500)
            })
            .catch(err => console.log(err));
    }

    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState(() => ({ [name]: value }))
    }

    render() {
        return (
            <div className="App-Layout register">
                <div className="register--left-box">
                    <TextComponent
                        subtitle={this.props.subtitle}
                        title='TODO APP'
                        needButton="LOGIN"
                        location="/login"
                        footerMessage="Copywrite Steven Failla 2018" />
                </div>
                <div className="register--right-box">
                    <h1 className="Form-Type register__right-title">Register Here</h1>
                    <RegisterForm 
                        email={this.state.email}
                        errors={this.state.errors}               
                        password={this.state.password}
                        confPassword={this.state.confPassword} 
                        handleOnChange={this.handleOnChange} />
                    <p style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>already registered? click <a href="/login" style={{ textDecoration: 'none' }}>here</a> to login</p>
                </div>
            </div>
        )
    }
}
