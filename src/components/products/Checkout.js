import React, {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import RemoveCartModal from './RemoveCartModal'
import CheckoutModal from './paymentComponents/CheckoutModal'

const Checkout = ({user, address}) => {
    const signatureMeal = JSON.parse(localStorage.getItem('signature-meal'))
    const pairMeal = JSON.parse(localStorage.getItem('pair-meal'))

    //after 24 hour use of local storage, remove item.
    const [localSignatureMeal] = useState(signatureMeal)
    const [localPairMeal, setLocalPairMeal] = useState(pairMeal)
    const [removeLocalWine, setRemoveLocalWine] = useState(false)

    const {first_name, last_name, email} = user.data
    const {street_address, address_number, city, state, zip_code, country} = address.data
    


    //Prevents rendering on first render. Must setLocalPairMeal in order to render the checkout page. (The way it gets removed is based on)
    //renders based on boolean prop passed down to RemoveCartModal
    const loaded = useRef(null);
        useEffect(() => {
            if (loaded.current) {
                setLocalPairMeal(localStorage.removeItem('pair-meal'))
            } else {
                loaded.current = true;
            }
    }, [removeLocalWine]);
    
    return (
        //use effect the address here so when a user restarts it auto requests it
        //problem with the changing the address and going back to checkout (put random meal in localStorage when going back to checkout?)
        <div className="global-mt global-mb">
            <div className="container">
                <h1 className="global-font global-link text-center">Review Your Order</h1>
                <div className="card">
                <div className="row">
                    <div className="col-md-4">
                            <div className="card-body">
                                <h6 className="card-subtitle mb-2 text-muted">Shipping address</h6>
                                <div>
                                    
                                    <p className="global-ct card-text">{first_name} {last_name}</p>
                                    
                                    {street_address === null ?
                                    <div>
                                    <div className="card-body">
                                        <p style={{fontSize: "14px"}}>You currently don't have a shipping address on your profile. Please <Link className="global-link" to="/profile/edit">update</Link> your address in order to continue checkout.</p>
                                    </div>
                                </div> 
                                :
                                <div>
                                    <p className="global-ct card-text">{street_address} {address_number}</p>
                                    <p className="global-ct card-text">{city}, {state} {zip_code}</p>
                                    <p className="global-ct card-text">{country}</p>
                                </div>
                                }
                                </div>

                                <div className="mt-5">
                                <h6 className="card-subtitle mb-2 text-muted">Email address</h6>
                                <p className="global-ct">{email}</p>
                            </div>
                            </div>
                    </div>
                        <div className="mt-2 col-md-4 text-center">
                            <h6 className="card-subtitle text-muted text-center">Items on your cart</h6>
                            
                            {/* If there is no meal in cart render empty. (Wine can't be purchased alone) */}
                            {!localSignatureMeal ?
                            <p><b>Your cart is currently empty</b></p> 
                            :
                            <div>

                                {/* render local just the meal if opted out of wine add on */}
                                {!localPairMeal ? 
                                <div>
                                    <div>
                                        <b style={{textDecoration: "underline"}}>{localSignatureMeal.mealTitle}</b>
                                    </div>
                                    <div>
                                        <img className="col-9 rounded" src={localSignatureMeal.mealImage} alt="signature-meal"></img>
                                    </div>
                                </div>
                                :

                                // renders both meal and wine with the option to remove wine if not interested
                                <div>
                                    <div>
                                        <b style={{textDecoration: "underline"}}>{localSignatureMeal.mealTitle}</b>
                                    </div>
                                    <div>
                                        <img className="col-6 rounded" src={localSignatureMeal.mealImage} alt="signature-meal"></img>
                                    </div>
                                    <div>
                                        <b style={{textDecoration: "underline"}}>{localPairMeal.wineTitle}</b>
                                    </div>
                                    <div>
                                        <img className="col-md-6 rounded" src={localPairMeal.wineImage} alt="signature-meal"></img>
                                        <div>
                                            {/* pop up modal if clicked make ask if they really want to remove it and have a description before */}
                                            {/* create a modal component */}
                                            <p><RemoveCartModal user={user} removeLocalWine={setRemoveLocalWine}/></p>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            }
                        </div>
                    <div className="col-md-4 mt-2">
                        <div className="card-body">
                            <div className="card"> 
                                <div className="container mt-4 mb-4">
                                    <div className="row">
                                        <div className="col-md-6"> 
                                            <div className="d-flex justify-content-start">                            
                                            <p className="card-subtitle text-muted">Item(s) total</p> 
                                            </div>
                                            
                                            <div className="d-flex justify-content-start">
                                            <p className="card-subtitle text-muted">Shipping</p> 
                                            </div>

                                            <div className="d-flex justify-content-start">
                                            <p className="card-subtitle text-muted">Sales tax</p>
                                            </div>
                                        </div>
                                    
                                        <div className="col-md-6"> 
                                            <div className="d-flex justify-content-end">
                                                    {!localSignatureMeal ?
                                                    //if nothing in cart, default to 0 dollars
                                                    <p className="card-subtitle text-muted">$0.00</p> 
                                                    :
                                                    //if wine is added on show pair-meal price (+ makes it an integer to be able to sum prices together)
                                                    <div>
                                                    {localPairMeal ?
                                                    <p className="card-subtitle text-muted">${+localSignatureMeal.mealPrice + +localPairMeal.winePrice}</p> 
                                                        :
                                                    <p className="card-subtitle text-muted">${+localSignatureMeal.mealPrice}</p>
                                                    }     
                                                    </div>  
                                                    }
                                                </div>      
                                                <div className="d-flex justify-content-end">
                                                    <p className="card-subtitle" style={{color: "green"}}>FREE</p>
                                                </div> 
                                                <div className="d-flex justify-content-end">   
                                                    <p className="card-subtitle text-muted">$0.00</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <p className="card-subtitle"><b>Order total</b></p> 
                                            </div>

                                            <div className="col-md-6 d-flex justify-content-end">

                                                {/* rendering the correct total amount for what product is on cart */}
                                            {!localSignatureMeal ?
                                                    <p className="card-subtitle text-muted"><b>$0.00</b></p> 
                                                    :
                                                    <div>
                                                    {localPairMeal ?
                                                    <p className="card-subtitle text-muted">${+localSignatureMeal.mealPrice + +localPairMeal.winePrice}</p> 
                                                        :
                                                    <p className="card-subtitle text-muted">${+localSignatureMeal.mealPrice}</p>
                                                    }     
                                                    </div>  
                                            }
                                            </div>
                                        <div>
                                            {/* if someone tries to make an order either disable or modal your cart is empty */}
                                            <div><CheckoutModal address={address} meal={signatureMeal}/></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* create a mock terms of use and private policy */}
                    <p className="text-center" >By clicking Place to order, you agree to Pickout's Terms of Use and Private Policy. </p>
                    </div>
                </div>
                </div>
                </div>
        </div>
    )
}

export default Checkout
