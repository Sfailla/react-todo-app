import React from 'react'


const TextComponent = ({ title, subtitle, location,  needButton, footerMessage }) => {
    return (
        <div className="text">
            <h1 className="text__title">{title}</h1>
            <div style={{ marginRight: '11rem' }}>
                {subtitle.length && subtitle.map((title, index) => {
                    return <p key={index} className="text__subtitle" >{title}</p>
                })}
            </div>
            {needButton ? <a href={location} className="text__button-wrap">
                <button className="form-button text__button">{needButton}</button>
            </a> : null }
            <p style={{ textAlign: 'center' }}>{footerMessage}</p>
        </div>
    )
}

export default TextComponent