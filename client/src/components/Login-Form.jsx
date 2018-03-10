import React from 'react' 
import InputComponent from '../utils/InputComponent';


const LoginForm = (props) => {    
    return (
        <div>
            <form className="login-form" onSubmit={props.handleOnSubmit}>
                <InputComponent 
                    className="input-component__input-email"
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter a email address"
                    handleOnChange={props.handleOnChange}/>
                <InputComponent 
                    className="input-component__input-password"
                    style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', }}
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Enter a password"
                    handleOnChange={props.handleOnChange}/>
                <input onClick={props.handleRedirect} className="form-button" style={{marginTop: '5rem' }} type="submit" value="LOGIN" />
            </form>
        </div>
    )
}

export default LoginForm