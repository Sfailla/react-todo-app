import React from 'react'
import PropTypes from 'prop-types'


const InputComponent = ({ className, placeholder, handleOnChange, label, name, type, value }) => {
    return (
        <div>
            <label className="Form-Type" style={{marginBottom: '.5rem', fontSize: '2.3rem', fontWeight: '600'}}>{label}</label>
            <input 
                className={className}
                type={type} 
                name={name}
                value={value} 
                onChange={handleOnChange}
                placeholder={placeholder} />
        </div>
    )
}

InputComponent.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string
}

export default InputComponent