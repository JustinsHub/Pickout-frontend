import React, {useState, useEffect, useContext, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import AppContext from '../AppContext'
import useFormData from '../custom-hooks/useFormData'
import useError from '../custom-hooks/useError'
import {Modal, Button} from 'react-bootstrap'

//Profile Edit component gets currentUsers profile initial value and update the value based on form input
const ProfileEdit = ({currentUser, currentAddress}) => {
    const {updateUser, deleteUser} = useContext(AppContext)
    const INITIAL_STATE = {
        first_name: currentUser.data.first_name || "",
        last_name: currentUser.data.last_name || "",
        email: currentUser.data.email || "",
    }

    const INITIAL_ADDRESS = {
        street_address: currentAddress.data.street_address,
        address_number: currentAddress.data.address_number,
        city: currentAddress.data.city,
        state: currentAddress.data.state,
        zip_code: currentAddress.data.zip_code,
        country: "United States"
    }

    const [editData, handleChange] = useFormData(INITIAL_STATE)
    const [editAddress, handleAddressChange] = useFormData(INITIAL_ADDRESS)
    const [editError, setEditError] = useError([])
    const [show, setShow] = useState(false);
    const [disableButton, setDisableButton] = useState(true)
    const [disableUpdate, setDisableUpdate] = useState(true)
    const [counter, setCounter] = useState(10)
    const history = useHistory()

    //the countdown for enabling delete button based on counter state initial value
    const disableTimer = useEffect(() => {
        const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        if(counter === 0) {
            setDisableButton(false) 
            setCounter(null)
        }
        //useEffect clean up
        return () => clearInterval(timer);
    }, [counter]);

    //holds useEffect render; disabling update button at first load by useRef and enables when/on .current(editData) is executed
    const loaded = useRef(null);
        useEffect(() => {
            if (loaded.current) {
                setDisableUpdate(false)
            } else {
                loaded.current = true;
            }
}, [editData, editAddress]);

    //toggles show component and resets button to initial value returning disableTimer is specifically for the delete button
    const handleShow = () => {
        setShow(show => !show)
        setCounter(counter => 10)
        setDisableButton(true)
        return disableTimer
    }

    //handleSubmit request API to update user
    const handleSubmit = async(e) => { // e.preventDefault() taken out for refresh for update? Find a better way
        e.preventDefault()
        //adding user data info as second parameter to save updated initial value and address value
        const res = await updateUser(currentUser.data.id, editData, editAddress) //object/editData must match API data names to be able to update
        return (res.status === 201) ? history.push('/profile') : setEditError('An error has occured.') // change to correct error
    }
    
    //handleDelete request API to delete the user permanently
    const handleDelete = async (e) => {
        e.preventDefault()
        const res = await deleteUser(currentUser.data.id) 
        return (res.status === 200) ? history.push('/') : setEditError('Something went wrong.') //set message successfully deleted on redirect page
    }

    return (
        <main className="global-form-p-e card rounded mx-auto d-block" style={{marginBottom: "5rem"}}>
        <div style={{margin: "1rem"}}>
        <p>{editError}</p>
            <div className="mt-3">
            <form onSubmit={handleSubmit}>
                <h1 className="global-title text-center h2 mb-2">Manage Account</h1>

                {/* User Edit */}
                
                <div>
                <label htmlFor="firstName">First Name</label> 
                <input
                    id="firstName"
                    className="form-control"
                    type="text"
                    placeholder="First Name"
                    name="first_name"
                    value={editData.first_name}
                    onChange={handleChange}
                    />

                <label  htmlFor="lastName">Last Name</label>
                <input
                    id="lastName"
                    className="form-control"
                    type="text"
                    placeholder="Last Name"
                    name="last_name"
                    value={editData.last_name}
                    onChange={handleChange}
                    />
                </div>

                <div>
                <label htmlFor="emailEdit">Email</label>
                <input    
                    id="emailEdit"
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={editData.email}
                    onChange={handleChange}
                    />
                </div>

                {/* Address edit */}
                <div>
                    <label htmlFor="street-address">Street Address</label>
                    <input
                    id="street-address"
                    type="text"
                    name="street_address"
                    value={editAddress.street_address}
                    className="form-control" 
                    placeholder="Street Address"
                    onChange={handleAddressChange}/>
                </div>

                <div>
                    <label htmlFor="address-number">Apartment, Suite, etc.</label>
                    <input
                    id="address-number"
                    type="number"
                    name="address_number"
                    value={editAddress.address_number}
                    className="form-control" 
                    placeholder="Apartment, Suite, etc."
                    onChange={handleAddressChange}/>
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input
                    id="city"
                    type="text"
                    name="city"
                    value={editAddress.city}
                    className="form-control" 
                    placeholder="City"
                    onChange={handleAddressChange}/>
                </div>
                <div>
                    <label htmlFor="State">State</label>
                    <input
                    id="state"
                    type="text"
                    name="state"
                    value={editAddress.state}
                    className="form-control" 
                    placeholder="State"
                    onChange={handleAddressChange}/>
                </div>
                <div>
                    <label htmlFor="zip-code">Zip Code</label>
                    <input
                    id="zip-code"
                    type="number"
                    name="zip_code"
                    value={editAddress.zip_code}
                    className="form-control" 
                    placeholder="Zip Code"
                    onChange={handleAddressChange}/>
                </div>
                <div>
                    <label htmlFor="Country">Country</label>
                    <input
                    id="country"
                    type="text"
                    name="country"
                    value={editAddress.country}
                    className="form-control" 
                    placeholder="United States"
                    onChange={handleAddressChange}
                    disabled
                    />
                </div>

                <div className="d-flex justify-content-center mt-3 m-1">
                <button className="btn btn-secondary m-1" onClick={()=> history.push('/profile')} >Cancel</button>
                <button className="btn btn-warning m-1" type="submit" disabled={disableUpdate}>Update</button> 
                </div>

                {/* Delete button features has a model and timer */}
                <div className="d-flex justify-content-center">
                    <Button style={{fontSize: "10px", color:"#da4343", marginTop:"0.7rem"}} variant="none" onClick={handleShow}>
                            Delete Profile
                        </Button>
                        <Modal
                            show={show}
                            onHide={handleShow}
                            backdrop="static"
                            keyboard={false}
                            animation={false}
                        >
                            <Modal.Header>
                            </Modal.Header>
                            <Modal.Body className="text-center">
                            <div>
                                Hello <b>{currentUser.data.username}</b>! This action cannot be undone! Once you delete your user profile, it will be gone forever!
                            </div>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleShow} >
                                Close
                            </Button> 
                            <Button variant="danger" onClick={handleDelete} disabled={disableButton}>Delete Profile {counter}</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
            </form>
        </div>
    </div>
    </main>
    )
}



export default ProfileEdit