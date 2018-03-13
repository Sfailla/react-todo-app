import React from 'react'

import TodoComponent from './TodoComponent'

const Dashboard = () => {
    return (
        <div className="App-Layout dashboard">
            <div className="dashboard--left-box">
                <TodoComponent />
            </div>
            <div className="dashboard--right-box">
                <h1 className="Form-Type dashboard__title">Dashboard</h1>
            </div>            
        </div>
    )
}

export default Dashboard