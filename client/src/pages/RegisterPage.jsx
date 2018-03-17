import React, { Component } from 'react'

import RegisterForm from '../components/Register-Form'
import TextComponent from '../components/TextComponent'

import AlertComponent from '../utils/AlertComponent'
import Authorize from '../utils/MyAuth'

export default class RegisterPage extends Component {
    static defaultProps = {
        subtitle: [
            '-this is a todo app that displays an express backend api and authentication using web tokens',
            '-to get started just register and then you will have access to the todo app',
            '-if you already registered than just click on the button below to login and go straight to the app'
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

        if (email && password !== '') {

            register(email, password)
                .then(res => res.json())
                .then(data => {
                    setToken(data.tokens[0].token)
                    setTimeout(() => this.props.history.push('/dashboard'), 300)
                })
                .catch(err => console.log(err))
        } else {  
            let error = 'Please fill out the form'
            this.setState((prevState) => ({ errors: [...prevState.errors, error] }))
        }
    }

    handleOnChange = (event) => {
        const { name, value } = event.target;
        this.setState(() => ({ [name]: value }))
    }

    render() {
        return (

            <div>
                {Array.isArray(this.state.errors) && this.state.errors.map((error, index) => {
                    return <AlertComponent key={index} type="error" errors={error} />
                })}
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
                            handleOnSubmit={this.handleOnSubmit}
                            handleOnChange={this.handleOnChange}
                            warningPW="always use a secure password" />
                        <p style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>already registered? click <a href="/login" style={{ textDecoration: 'none' }}>here</a> to login</p>
                    </div>
                </div>
            </div>
        )
    }
}
