import React, {useContext} from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import AppContext from '../../AppContext'
import CheckoutForm from './CheckoutForm';
import Payment from './paymentApi';

const PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(PUBLIC_KEY);

//Get items from localStorage(cart) ready to parse to obtain the object stored(id)
const ourLocalMeal = localStorage.getItem('signature-meal')
const ourWinePair = localStorage.getItem('pair-meal')

const StripeContainer = ({success}) => {
    const {currentUser} = useContext(AppContext)
    const {id} = currentUser.data

    const makeSignatureMealPurchase = async (id, mealId) => {
        //plug in our parameters already so we just execute when we pass it down the prop for checkout
        const res = await Payment.signatureMealPurchase(id, mealId)
        return res
    }


    const makePairMealPurchase = async (id, mealId, pairId) => {
        const res = await Payment.pairMealPurchase(id, mealId, pairId)
        return res
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm meal={makeSignatureMealPurchase} pair={makePairMealPurchase} successfulPayment={success}/>
        </Elements>
    )
}

export default StripeContainer