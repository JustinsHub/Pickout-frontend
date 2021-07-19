import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import {Modal} from 'react-bootstrap';
import StripeContainer from './StripeContainer';

const CheckoutModal = ({address, meal}) => { //change the disabled button based on address and meal = cart
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false)
    const [ourAddress] = useState(address)
    const [ourCheckout, setOurCheckout] = useState(false)


    //Renders checkout buttons if there's an address and an item on the cart
    useEffect(()=>{
        const {street_address} = ourAddress.data
        if(street_address){
            if(meal)
                setOurCheckout(true)
        }
    }, [ourAddress, meal])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const goHome = () => {
        localStorage.removeItem('signature-meal')
        if(localStorage.getItem('pair-meal')){
            localStorage.removeItem('signature-meal')
        }
        history.push('/')
    }

    //Questions sections
    //TESTS
    //Policy and Terms and conditions?

    return (
        <>
        {ourCheckout && 
        <button className="w-100 btn btn-default mt-3" style={{color: "white"}} onClick={handleShow}>
            Proceed to checkout
        </button>
        }

    <Modal show={show} onHide={handleClose} backdrop="static">
        {/* set up conditional when successful payment this modal changed to go home. */}
        {!success ?
        <>
        <Modal.Header className="d-flex justify-content-center global-font" style={{fontSize: "23px"}}>
            Enter your debit or credit card
        </Modal.Header>
        <Modal.Body>
            <StripeContainer success={setSuccess}/>
            <p className="global-remove-cart text-center mt-2" onClick={handleClose}>Cancel order</p>
        </Modal.Body>
        </>
        :
        <>
        <Modal.Body className="text-center">
        <div class="alert alert-success" role="alert">
            Successful Payment!
        </div>
        <div>
            <p>Thank you for using Pickout!</p>
            <button className="btn btn-default" style={{color: "white"}} onClick={goHome}>Go Home</button>
        </div>
        </Modal.Body>
        </>
        }
    </Modal>
    </>
    )
}


export default CheckoutModal