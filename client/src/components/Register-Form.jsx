import React from 'react'
import InputComponent from './InputComponent';


const RegisterForm = (props) => {
    return (
        <div>
            <form className="register-form" onSubmit={props.handleOnSubmit}>
                <InputComponent
                    className="input-component__input-email"
                    label="Email"
                    type="email"
                    name="email"
                    value={props.email}
                    placeholder="Enter a email address"
                    handleOnChange={props.handleOnChange} />

                <InputComponent
                    className="input-component__input-password"
                    label="Password"
                    name="password"
                    type="password"
                    value={props.password}
                    placeholder="Enter a password"
                    handleOnChange={props.handleOnChange} />

                <InputComponent 
                    className="input-component__input-confirm-password"
                    label="Confirm Password"
                    name="confPassword"
                    type="password"
                    value={props.confPassword}
                    placeholder="Please confirm your password"
                    handleOnChange={props.handleOnChange} />

                <p style={{ color: 'red', fontSize: '1.5rem', textAlign: 'right' }}>always use a secure password</p>
                <input className="form-button" style={{marginTop: '6rem' }} type="submit" value="REGISTER" /> 
            </form>               
        </div>
    )
}

export default RegisterForm