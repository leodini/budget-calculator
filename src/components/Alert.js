import React from 'react'

const Alert = (props) => {
    return (
        <div className={`alert alert-${props.type}`}>{props.text}</div>
    )
}

export default Alert
