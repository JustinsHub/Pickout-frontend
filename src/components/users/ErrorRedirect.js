import React from 'react'
import {Link} from 'react-router-dom'

const ErrorRedirect = () => {
    //css on this for better font/color
    return (
        <div className="global-mt text-center">
            <h1>
            You must <Link className="global-link" to="/login">login</Link> to in order to continue.
            </h1>
            <p>
            Don't have an account? You can <Link className="global-link" to="/signup">sign up</Link> here.
            </p> 
        </div>
    )
}

export default ErrorRedirect