import React from 'react'
import {useHistory} from 'react-router-dom'
import '../styles/global.css'

//User profile and information with edit button
const Profile = ({currentUser, currentAddress}) => {

    const history = useHistory()

    const profileEdit = () => {
        history.push('/profile/edit')
    } 
    
    const {username, first_name, last_name, email} = currentUser.data
    const {street_address, address_number, zip_code, city, state, country} = currentAddress.data

    if(!currentUser){
        history.push('/access/error')
    }

    return (
        <main className="global-form card rounded mx-auto d-block global-mb">
            <div className="text-center m-3">
                <h1 className="global-title h2 mb-2 fw-normal">{username} Profile</h1>
                <label>First Name</label>
                <p>{first_name === null ? <i>(First Name)</i> : first_name}</p>
                
                <label>Last Name</label>
                <p>{last_name === null ? <i>(Last Name)</i> : last_name}</p>
                
                <label>Email</label>
                <p>{email === null ? <i>(Email Address)</i> : email}</p>
                
                <label>Street Address</label>
                <p>{street_address === null ? <i>(ex: 12345 Sesame Street)</i> : street_address}</p>
                
                <label>Apartment/Suite/Other</label>
                <p>{address_number === null ? <i>(Apartment/Suite/Other Number)</i> : address_number}</p>
                
                <label>City</label>
                <p>{city === null ? <i>(City)</i> : city}</p>
                
                <label>State</label>
                <p>{state === null ? <i>(State)</i> : state}</p>
                
                <label>Zip Code</label>
                <p>{zip_code === null ? <i>(Zip Code)</i> :zip_code}</p>
                
                <label>Country</label>
                <p>{country === null ? <i>(United States)</i> : country}</p>
                
                <div className="mt-3 mb-4">
                <button className="btn btn-primary mt-2" type="submit" onClick={profileEdit}>Edit Profile</button>
                </div>
            </div>
        </main>
    )
}

export default Profile