import React from 'react'


const alertStyles = {
    width: '25%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px',
    padding: '1rem'

}

const AlertComponent = ({ type, success, errors }) => {

    if (type === 'error') {
        return (
            <div style={{ ...alertStyles, backgroundColor: 'rgb(241, 214, 214)', color: '#AF4442', border: '1px solid #AF4442', }}>
                <p>{errors}</p></div>
        )
    } else if (type === 'success') {
        return (
            <div style={{ ...alertStyles, backgroundColor: 'rgb(211, 230, 203)', color: '#3C763D', border: '1px solid #3C763D', }}>
                <p>{success}</p>
            </div >
        )
    }
    
}

// export const AlertSuccess = (props) => {
//     return (
//         <div style={{ ...alertStyles, backgroundColor: 'rgb(211, 230, 203)', color: '#3C763D', border: '1px solid #3C763D', }}>
//             <p>{errors}</p>
//         </div >
//     )
// }

export default AlertComponent
