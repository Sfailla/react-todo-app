import React from 'react'


const alertStyles = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    padding: '1rem'

}

const AlertDanger = (props) => {
    return (
        <div style={{...alertStyles, backgroundColor: 'rgb(241, 214, 214)', color: '#AF4442',  border: '1px solid #AF4442',}}>
            <p>{props.errors}</p>
        </div>
    )
}

export const AlertSuccess = (props) => {
    return (
        <div style={{...alertStyles, backgroundColor: '', color: '', border: ''}}>
            <h2>{props.success}</h2>
        </div>
    )
}

export default AlertDanger
