import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import AppContext from './AppContext'
import User from './users/usersApi'
import useLocalStorage from './custom-hooks/useLocalStorage'
import jwt from 'jsonwebtoken'
import LoadSpinner from './commons/LoadSpinner'

const AppContextWrapper = ({children}) => {
    const localStorageKey = "token"

    const [currentUser, setCurrentUser] = useState(null)
    const [currentAddress, setCurrentAddress] = useState(null)
    const [token, setToken] = useLocalStorage(localStorageKey) 
    const [loading, setLoading] = useState(false)

    const history = useHistory()

    //must refactor for commons
    useEffect(()=> {
        const getCurrentUser = async()=> {
            //getting the current user using the token we stored in localStorage (from register/login)
            //if token, get current user by decoding the token object
        if(token){
            try{
            const {id} = jwt.decode(token)
            const user = await User.getUserId(id)
            const address = await User.getUserAddress(id)
            delete user.data.password //deletes hashed password to not show on data
            setCurrentUser(user)
            setCurrentAddress(address)
        }catch(e){
            return e
        }
        }
    }
        setLoading(true)
        getCurrentUser()
    }, [token])

    //requests to register // creates jwt // sets token token to local storage
    const register = async(userInfo) => {
        const res = await User.register(userInfo)
        if(res.data){
            setToken(res.data.token) //store token on localStorage when registered
        }
        return res
    }

    //requests to login // checks jwt // sets token token to local storage
    const login = async(loginInfo) => {
        const res = await User.login(loginInfo)
        if(res.data){   
            setToken(res.data.token) //store token on localStorage when logged in
        }
        return res 
    }

    //redirects after setting the currentUser to null and clearing localStorage when executed
    const logout = () => {
        setCurrentUser(null)
        //future implementation: Users are able to login with items still saved on cart
        localStorage.clear()
        history.push('/login') 
    }

    //updates user; user's id as first parameter and updated values for second. Must setCurrentUser to render correctly
    const updateUser = async(id, userInfo, addressInfo) => {
        const userResults = await User.updateUser(id, userInfo)
        const addressResults = await User.updateAddress(id, addressInfo)
        setCurrentUser(userResults)
        setCurrentAddress(addressResults)
        return userResults
    }
    //requests to delete user and set the currentUser to back to null
    const deleteUser = async(id) => {
        // const checkPassword = await User.checkPassword(id, userInfo) // keep for now for future feature?
        // if(!checkPassword){
        //     console.log('wrong')
        // }
        const res = await User.deleteUser(id)
        setCurrentUser(null)
        return res 
    }
    
    if(!loading) return <div className="Loading-global"><LoadSpinner/> <p className="text-center m-2">Loading deliciousness...</p></div> //if anything is not loaded on the page, render this component

    return (
        <div>
            <AppContext.Provider value={{currentUser, currentAddress, register, login, logout, token, updateUser, deleteUser}}>
            {children}
            </AppContext.Provider>
        </div>
    )
}

export default AppContextWrapper