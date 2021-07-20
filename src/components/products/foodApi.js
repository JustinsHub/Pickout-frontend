import axios from 'axios'
import {ourRandomTags, ourRandomWines, randNum} from '../commons/shuffleArray'

const BASE_URL_SPOONTACULAR = "https://api.spoonacular.com" 
const SPOONTACULAR_API_KEY = process.env.REACT_APP_SPOONTACULAR_API_KEY

//base url api from my backend
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

class Products {
    //our API for signature-meal
    static async getSignatureMeal() {
        const res = await axios.get(`${BASE_URL}/meals/signature-meal`)
        return res
    }

    //get API for wine information
    static async getPairMeal(){
        const res = await axios.get(`${BASE_URL}/meals/pair-meal`)
        return res
    }
    //generates a random cuisine tag based on array in imported function
    static async getRandomMeal() {
        const res = await axios.get(`${BASE_URL_SPOONTACULAR}/recipes/random?&tags=${ourRandomTags}&apiKey=${SPOONTACULAR_API_KEY}`)
        return res
    }

    //random wine make sure to put type to match the random meal if there type on random meal api find it
    //generates a random number for API parameter
    static async getRandomWine() {
        const res = await axios.get(`${BASE_URL_SPOONTACULAR}/food/wine/recommendation?wine=${ourRandomWines}&number=${randNum}&apiKey=${SPOONTACULAR_API_KEY}`)
        return res
    }
    
}

export default Products
