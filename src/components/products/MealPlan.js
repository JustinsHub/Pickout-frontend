import React from 'react'
import {useHistory} from 'react-router-dom'
import '../styles/Price&Plans.css'
import randomMeal from '../styles/images/randomMeal.jpeg'
import useError from '../custom-hooks/useError'

const MealPlan = ({user}) => {
    const history = useHistory()
    const [loginError, setLoginError] = useError(null)

    const signatureMealPath = () => user ? history.push('/signature-meal') : setLoginError('Please login in order to continue.') //make alert popup/modal?

    return (
        <section className="PriceAndPlans global-t-a">
            {loginError && 
            <div className="alert alert-danger" role="alert">
                {loginError}
            </div>
            }
            <div className="container">
                <div className="PriceAndPlans-content">
                <div>
                    <h1 className="PriceAndPlans-t">Our Plan
                    <p className="PriceAndPlans-sub mt-1">The meals are chosen for your conveniency!</p>
                    </h1>
                </div>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-5">
                        <div className="PriceAndPlans-c card" style={{border: "0px"}}>
                            <img src={randomMeal} className="card-img-top" alt="Alternative Text"/>
                            <div className="card-body">
                                <h5 className="card-title">Signature</h5>
                                <p className="card-text">The Signature let's us choose a random meal from a wide variety of choices.</p>
                                <p></p>
                                <button className="PriceAndPlans-btn w-100 btn btn-default" onClick={signatureMealPath} style={{color: "white"}} >Select</button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        <section className="PriceAndPlans-q">
            Question section
        </section>
        </section>
    )
}

export default MealPlan