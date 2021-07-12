import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap';

const RemoveCartModal = ({user, removeLocalWine}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const removeWine = () => {
        setShow(false)
        removeLocalWine(true)
    }

    return (
        <>
    <p className="global-remove-cart" onClick={handleShow}>
        Remove wine
    </p>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header>
        </Modal.Header>
        <Modal.Body>Hey {user.data.username}! Just a heads up, once you remove your wine from your cart you won't be able to add another 
        wine for another 24 hours based on our terms. Please read our <Link to="/policy">policy</Link> in order to understand how it works. 
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        <Button variant="danger" onClick={removeWine}>
            Remove
        </Button>
        </Modal.Footer>
    </Modal>
    </>
    )
}

export default RemoveCartModal