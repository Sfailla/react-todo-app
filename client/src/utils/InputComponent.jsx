import React from 'react'


const InputComponent = ({className, placeholder, handleOnChange, label, name, type, value}) => {
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

export default InputComponent