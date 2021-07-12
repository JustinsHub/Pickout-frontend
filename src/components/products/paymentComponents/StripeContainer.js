import React, {useContext} from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { PUBLIC_KEY } from '../../config';
import AppContext from '../../AppContext'
import CheckoutForm from './CheckoutForm';
import Payment from './paymentApi';

const stripePromise = loadStripe(PUBLIC_KEY);

//Get items from localStorage(cart) ready to parse to obtain the object stored(id)
const ourLocalMeal = localStorage.getItem('signature-meal')
const ourWinePair = localStorage.getItem('pair-meal')

const StripeContainer = ({success}) => {
    const {currentUser} = useContext(AppContext)
    const {id} = currentUser.data

    const makeSignatureMealPurchase = async () => {
        const mealId = JSON.parse(ourLocalMeal)
        //plug in our parameters already so we just execute when we pass it down the prop for checkout
        const res = await Payment.signatureMealPurchase(id, mealId.mealId)
        return res
    }

    const makePairMealPurchase = async () => {
        const mealId = JSON.parse(ourLocalMeal)
        const pairId = JSON.parse(ourWinePair)
        const res = await Payment.pairMealPurchase(id, mealId.mealId, pairId.wineId)
        return res
    }

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm meal={makeSignatureMealPurchase} pair={makePairMealPurchase} successfulPayment={success}/>
        </Elements>
    )
}

export default StripeContainer