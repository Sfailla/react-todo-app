import React, { Component } from 'react'

import Authorize from '../utils/MyAuth'

import TodoComponent from './TodoComponent'


export default class Dashboard extends Component {

    Authorize = new Authorize()

    handleLogOut = () => {
        this.Authorize.logout()
        setTimeout(() => { return this.props.history.push('/login') }, 250)
    }

    render() {
        return (
            <div className="App-Layout dashboard"> 
                <div className="dashboard--left-box">
                    <TodoComponent />
                </div>
                <div className="dashboard--right-box">
                    <div className="dashboard__wrapper"> 
                        <div className="dashboard__header">
                            <h1 className="dashboard__title">Dashboard</h1>
                        </div>
                        <div className="dashboard__container">
                            <button onClick={this.handleLogOut}>SIGN OUT</button>
                            <button>REMOVE ALL</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
