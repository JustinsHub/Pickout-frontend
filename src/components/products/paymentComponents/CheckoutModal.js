import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Modal} from 'react-bootstrap';
import StripeContainer from './StripeContainer';

const CheckoutModal = () => {
    const history = useHistory()
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const goHome = () => {
        localStorage.removeItem('signature-meal')
        if(localStorage.getItem('pair-meal')){
            localStorage.removeItem('signature-meal')
        }
        history.push('/')
    }

    //Fix authorization (needs address) on checkout
    //Questions sections
    //TESTS
    //Policy and Terms and conditions?
    //launch Netlify

    return (
        <>
    <span onClick={handleShow}>
        Proceed to checkout
    </span>

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