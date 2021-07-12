import React from 'react'
import {Link} from 'react-router-dom'
import './styles/Footer.css'

const Footer = () => {
    return (
        <div className="Footer global-t-a">
            <span className="text-muted">&copy; 2021 &nbsp;
            <Link className="Footer-l text-muted" to='/'>Pickout</Link>
            </span>
        </div>
    )
}

export default Footer