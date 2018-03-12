import React from 'react'
import PropTypes from 'prop-types'

import InputComponent from './InputComponent';


const RegisterForm =  ({ handleOnSubmit, handleOnChange, email, password, confPassword, warningPW }) => {
    return (
        <div>
            <form className="register-form" onSubmit={handleOnSubmit}>
                <InputComponent
                    className="input-component__input-email"
                    label="Email"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter a email address"
                    handleOnChange={handleOnChange} />

                <InputComponent
                    className="input-component__input-password"
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    placeholder="Enter a password"
                    handleOnChange={handleOnChange} />

                <InputComponent 
                    className="input-component__input-confirm-password"
                    label="Confirm Password"
                    name="confPassword"
                    type="password"
                    value={confPassword}
                    placeholder="Please confirm your password"
                    handleOnChange={handleOnChange} />

                <p style={{ color: 'red', fontSize: '1.5rem', textAlign: 'right' }}>{warningPW}</p>
                <input className="form-button" style={{fontSize: '1.8rem', marginTop: '6rem' }} type="submit" value="REGISTER" /> 
            </form>               
        </div>
    )
}

RegisterForm.propTypes = {
    handleOnSubmit: PropTypes.func,
    handleOnChange: PropTypes.func,
    email: PropTypes.string,
    password: PropTypes.string,
    confPassword: PropTypes.string,
    warningPW: PropTypes.string
}

export default RegisterForm