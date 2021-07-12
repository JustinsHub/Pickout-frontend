import React, {useState, useContext} from 'react'
import AppContext from './AppContext'
import {NavLink} from 'react-router-dom'
import Lottie from 'react-lottie'
import './styles/navbar.css'

const Navbar = () => {
    const {currentUser, logout} = useContext(AppContext) 
    const [navbar, setNavbar] = useState(false)
    //Todo: 
    //Find navbar/brand icon 
    //api for our the website (payment) 
    //cart? // prices of api items
    //fake terms and conditions //already logged in... (register) //
    //while on access/error have a random food joke request for entertainment?

    const avatarLogo = {
        loop: false,
        autoplay: true,
        animationData: require('./styles/logos/avatarLogo.json'), // the path to the animation json
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const changeOnScroll = () => {
        window.scrollY >= 1 ? setNavbar(true) : setNavbar(false)
        }
    

    window.addEventListener('scroll', changeOnScroll)

    return (
        <main className="Navbar">
        <nav className={navbar ? 'navbar active fixed-top' : 'navbar fixed-top'}>
            <div className="container">
                <NavLink className="Navbar-hover navbar-brand" to="/">PICKOUT</NavLink>

                {/* if logged in, render username with dropdown else signup/login routes */}
                {currentUser ? 
                <ul className="nav">
                    <div className="dropdown">
                    <li className="nav-item" data-bs-toggle="dropdown">
                        <Lottie options={avatarLogo} height={50} width={50}/>
                    </li>
                    <ul className="dropdown-menu">
                        <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                        <li><NavLink className="dropdown-item" to="/checkout">Cart</NavLink></li>
                        <li className="dropdown-item" onClick={logout}>Logout</li>
                    </ul>
                    </div>
                </ul>
            
                :
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <NavLink className="Navbar-color Navbar-hover btn" to="/login">
                            Login
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="Navbar-hover btn btn-default" style={{color: "white"}}to="/signup">
                            Sign Up
                        </NavLink>
                    </li>
                </ul>
                }  
            </div>
        </nav>
        </main>
    )
}

export default Navbar
