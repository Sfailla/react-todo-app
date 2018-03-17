import React from 'react'

import Icon25, { Icon50 } from '../utils/SVGComponent'


const DashboardComponent =  ({ handleLogOut }) => {
    return (
        <div className="dashboard__wrapper">
            <div className="dashboard__header">
                <div className="dashboard__title-container">
                    <h1 className="Form-Type dashboard__title">Dashboard</h1>
                </div>
                <span className="dashboard__svg-span--user">
                    <Icon50 icon="user" className="user" />
                </span>

                <p className="dashboard__subtitle">what would you like to do?</p>
            </div>
            <div className="dashboard__container">
                <button className="circle-button dashboard__button--logout" onClick={handleLogOut}>
                    <Icon25 icon="logout" className="logout" />
                </button>
                <button className="dashboard__button--remove-all">REMOVE ALL</button>
                <button className="dashboard__button--edit">EDIT TODO</button>
            </div>
        </div>
    )
}

export default DashboardComponent