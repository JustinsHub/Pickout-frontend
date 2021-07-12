import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

class Payment {
    static async signatureMealPurchase(userId, mealId) {
        const res = await axios.post(`${BASE_URL}/meals/signature/${mealId}/purchase/${userId}`)
        return res
    }
    
    static async pairMealPurchase(userId, mealId ,pairId) {
        const res = await axios.post(`${BASE_URL}/meals/pair-meal/${mealId}/${pairId}/purchase/${userId}`)
        return res
    }

    static async signatureStripePayment(id) {
        try {
            const signatureMealPrice = 899
            const res = await axios.post(`${BASE_URL}/stripe/signature-meal-payment`, {
                amount: signatureMealPrice,
                id
            })
            if(res.data.success){
            console.log("Signature Meal payment successful")
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    static async pairStripePayment(id) {
        try {
            const pairMealPrice = 1698
            const res = await axios.post(`${BASE_URL}/stripe/pair-meal-payment`, {
                amount: pairMealPrice,
                id
            })
            if(res.data.success){
            console.log("Pair Meal payment successful")
            }
        } catch (error) {
            console.log("Error", error)
        } 
    }
}

export default Payment