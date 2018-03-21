import React, { Component } from 'react'


// const alertStyles = {
//     width: '25%',
//     margin: '0 auto',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: '.5rem',
//     padding: '1rem',
//     transition: 'opacity 500ms ease-in'

// }


class AlertComponent extends Component {
    state = {
        className: this.props.className || 'alert__error fade-in',
        alert: false,
        errors: this.props.errors
    }

    handleCloseAlert = async () => {
        await this.setState(() => ({ className: 'alert__error fade-out' , alert: false }))
        await setTimeout(() => {
            this.setState(() => ({ className: 'not-active', errors: [] }))
        }, 1100)
    }

    render() {
        return (
            this.props.type === 'error' ?
                <div className={this.state.className}>
                    <p>{this.state.errors}</p>
                    <button className="alert__error-button" onClick={this.handleCloseAlert}>X</button>
                </div>
                :
                <div className={this.state.className}>
                    <p>{this.props.success}</p>
                </div>
        )
    }
}


export default AlertComponent
