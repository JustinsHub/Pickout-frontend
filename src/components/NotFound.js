import React from 'react'
import {useHistory} from 'react-router-dom'

const NotFound = () => {
    const history = useHistory()

    const goHome = () => {
        history.push('/')
    }

    return (
        <div className="global-mt global-t-a">
            <h1>PAGE NOT FOUND</h1>
            <button className="btn btn-primary" onClick={goHome}>Go Home</button>
        </div>
    )
}

export default NotFound