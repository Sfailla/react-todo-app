import React, { Component } from 'react'

import Authorize from '../utils/MyAuth'

import TodoComponent from '../components/TodoComponent'
import DashboardComponent from '../components/DashboardComponent'


export default class Dashboard extends Component {
    state = {
        todos: []
    }

    Authorize = new Authorize()

    handleLogOut = () => {
        this.Authorize.logout()
        setTimeout(() => { return this.props.history.push('/login') }, 250)
    }

    handleRemoveAll = () => {
        this.setState(() => ({ todos: [] }))
    }

    render() {
        return (
            <div className="App-Layout dashboard"> 
                <div className="dashboard--left-box">
                    <TodoComponent
                        handleRemoveAll={this.handleRemoveAll} />
                </div>
                <div className="dashboard--right-box">
                    <DashboardComponent
                        handleLogOut={this.handleLogOut} />
                </div>
            </div>
        )
    }
}
