import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home'
import Login from './users/Login'
import SignUp from './users/SignUp'
import NotFound from './NotFound'
import AppContext from './AppContext'
import EnsureLoginRoute from './EnsureLoginRoute'
import Profile from './users/Profile'
import ProfileEdit from './users/ProfileEdit'
import MealPlan from './products/MealPlan'
import SignatureMeal from './products/SignatureMeal'
import Checkout from './products/Checkout'
import Policy from './products/Policy'
import ErrorRedirect from './users/ErrorRedirect'
import AccessError from './users/AccessError'


const Routes = () => {
    const {login, register, currentUser, currentAddress} = useContext(AppContext)
    return (
        <div>
            
            <Switch>
                <Route exact path="/login">
                    <Login login={login} user={currentUser}/>
                </Route>

                <Route exact path="/signup">
                    <SignUp register={register} user={currentUser}/>
                </Route>

                <EnsureLoginRoute exact path="/profile">
                    <Profile currentUser={currentUser} currentAddress={currentAddress}/>
                </EnsureLoginRoute>

                <EnsureLoginRoute exact path="/profile/edit">
                    <ProfileEdit currentUser={currentUser} currentAddress={currentAddress}/>
                </EnsureLoginRoute>

                <Route exact path="/signature-meal">
                    <SignatureMeal user={currentUser}/>
                </Route>

                <Route exact path="/plans">
                    <MealPlan user={currentUser}/>
                </Route>

                <Route exact path="/checkout">
                    <Checkout user={currentUser} address={currentAddress}/>
                </Route>

                <Route exact path="/policy">
                    <Policy user={currentUser}/>
                </Route>

                <Route exact path="/">
                    <Home/>
                </Route>
            
                <Route exact path="/error/must-login-or-signup">
                    <ErrorRedirect/>
                </Route>

                <Route exact path="/access/error">
                    <AccessError/>
                </Route>

                <Route>
                    <NotFound/>
                </Route>
            </Switch>
        </div>
    )
}

export default Routes