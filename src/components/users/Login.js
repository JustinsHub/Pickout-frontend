import React from 'react'
import {useHistory, Redirect, Link} from 'react-router-dom'
import useFormData from '../custom-hooks/useFormData'
import useError from '../custom-hooks/useError'

const Login = ({login, user}) => {

    //add dont have an account? link to sign up
    const INITIAL_STATE = {
        username: "",
        password: ""
    }
    const history = useHistory()
    
    const [formData, handleChange] = useFormData(INITIAL_STATE)
    const [loginError, setLoginError] = useError([])

    //requests login api when submitted
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await login(formData)
        return (res.status === 201) ? history.push('/profile'): setLoginError(res)
    }
    

    //if a user is logged in, they will be redirected if they try to access this component
    if(user){
        return <Redirect to="/access/error"/>
    }

    return (
        <main className="global-form card rounded mx-auto">
            {loginError && <h1>{loginError}</h1>}
            <div className="text-center m-3">
            {/* change UI errors warning */}
        <form onSubmit={handleSubmit}>
        <h1 className="global-font h2 mb-2" style={{color: "#da4343"}}>Log In</h1>
            <div>
                <label htmlFor="username"/>
                <input
                id="username"
                className="form-control"
                type="text"
                name="username"
                value={formData.username}
                placeholder="Username"
                onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password"/>
                <input
                id="password"
                className="form-control"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
                />
            </div>
            <div className="mt-3">
                <button className="w-100 btn btn-lg btn-default" style={{color: "white"}}>Sign In</button>
            </div>
            <div className="mt-3">
                <p style={{fontSize: "12px", color: "#949494"}}>Don't have an account? Sign up <Link className="global-link" to="/signup">here</Link>.</p>
            </div>
        </form>
        </div>
        </main>
    )
}

export default Login