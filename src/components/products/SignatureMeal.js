import React, {useState} from 'react'
import parse from 'html-react-parser'
import {useHistory, Link} from 'react-router-dom'
import Products from './foodApi'
import WineAddOn from './WineAddOn'
import LoadSpinner from '../commons/LoadSpinner'
import shuffleArray from '../commons/shuffleArray'
import useLocalStorage from '../custom-hooks/useLocalStorage'
import '../styles/SignatureMeal.css'

//get a single random meal by requesting from API and render image and description
const SignatureMeal = ({user}) => {
    const signatureMealStorage = "signature-meal"
    const history = useHistory()

    //Signature Meal states
    const [mealTitle, setMealTitle] = useState(null)
    const [mealImage, setMealImage] = useState(null)
    const [mealPrice, setMealPrice] = useState(null)
    const [mealSummary, setMealSummary] = useState("")
    const [mealId, setMealId] = useState(null)
    const [isRequesting, setIsRequesting] = useState(false)
    const [signatureMeal, setSignatureMeal] = useLocalStorage(signatureMealStorage) 

    //Wine add on states
    const [wineTitle, setWineTitle] = useState(null)
    const [wineImage, setWineImage] = useState(null)
    const [isClickedNo, setIsClickedNo] = useState(false)

    //make user only be able to pick one random meal a day
    //have a countdown timer when clicked 24hour
    //css

    //requests random meal timed for loading to show animation (stores in localStorage and must run through as json to store multiple)
    const getRandomMeal = async() => {
        const res = await Products.getRandomMeal()
        const mealResults = await Products.getSignatureMeal()
        const {id, price} = mealResults.data[0]
        const {image, title, summary} = res.data.recipes[0]
        setTimeout(() => {
            console.log(signatureMeal)
            setMealTitle(title)
            setMealImage(image)
            setMealSummary(summary)
            setMealId(id)
            setMealPrice(price)
        }, 4000)
        setIsRequesting(true)
    }

    //passes this function to WineAddOn prop. Uses it here to request just the image to render on the correct placement 
    //for User UI next to request randomMeal
    const getRandomWine = async () =>{
        const res = await Products.getRandomWine()
        const randomWine = shuffleArray(res.data.recommendedWines)
        const {title, imageUrl} = randomWine
        setTimeout(()=> {
        setWineTitle(title)
        setWineImage(imageUrl)
        }, 4000)
        return randomWine
    }
    //adds requested API info to localStorage to be able to pass info to Checkout component
    const addToCart = async () =>{ 
        await setSignatureMeal(JSON.stringify({mealId, mealTitle, mealImage, mealPrice}))
        setTimeout(()=> {
            history.push('/checkout')
        }, 500)
    }
    
    // if(!user) {
    //     history.push("/error/must-login-or-signup")
    // }

    return (
        <div className="Signature-Meal-m global-t-a">

            {/* if the request has been filled based on image, then render the API(food) */}
            {mealImage ? 
                <div className="Signature-Meal-c card">
                    <div className="card-body">
                        <div className="container">   
                        <div className="row">
                        
                            <div>
                            {!wineImage ?
                            <div className="col-md-12 d-flex justify-content-center">
                            <div className="col-md-3">
                            </div>
                            <div className="col-md-6">
                                <h1 className="Signature-Meal-f card-title">{mealTitle}</h1>
                                <img className="Signature-Meal-i" src={mealImage} alt="Signature Meal"/>
                            </div>
                            <div className="col-md-3">
                            </div>
                            </div>

                            //render meal with wine if there's add on wine
                            :
                            <div className="col-md-12 d-flex justify-content-center">
                                <div className="col-md-6">
                                    <h1 className="card-title">{mealTitle}</h1>
                                    <img className="Signature-Meal-i" src={mealImage} alt="Signature Meal"/>
                                </div>
                                <div className="col-md-6">
                                    <h1 className="card-title">{wineTitle}</h1>
                                    <img src={wineImage} alt="wine-add-on"></img>
                                </div>  
                            </div>
                            }
                            </div>
                            
                        </div>
                            <p>{parse(mealSummary)}</p>
                        </div>

                        {/* state isClickedNo prop passed on to WineAddOn component to render this conditional if user clicks No */}
                        {isClickedNo ?
                        <button className="btn btn-default mt-2" style={{color: "white"}} onClick={addToCart}>Add to Cart</button>
                        :
                        <WineAddOn wineRequest={getRandomWine} clickNo={setIsClickedNo} mealTitle={mealTitle} wineImage={wineImage} addToCart={addToCart}/>
                        }

                    </div>
                    <p className="Signature-Meal-policy">Not satisfied with this choice? Check out our meal <Link style={{textDecoration: "none"}} to="/policy">policy</Link>.</p>
                </div>
                :   
                // added a conditional inside to render loading statement when requesting
            <div className="Signature-Meal-e" style={{width: "30rem"}}>
                {!isRequesting ?  
                <div className="Signature-Meal-e-c card">
                <div className="card-body">
                <div className="row">
                    <h1 className="Signature-Meal-f mb-4">The way it works</h1>
                    <div className="col-md-0">
                    </div> 
                    <p className="Signature-Meal-p-f col-md-12">
                            When you're ready, you <b>click the button</b>. We have a system that randomly chooses a meal for you from our wide variety of choices. Foods from all over the world.
                            The meal is one serving, for one person, at one sitting - <b>just heat and eat.</b>
                    </p>
                    <div className="col-md-0">
                    </div>
                    
                    <div>
                    <button className="Signature-Meal-b btn btn-default w-25" style={{color: "white"}} onClick={getRandomMeal}>Get Meal</button>
                    </div>
                </div>
                </div>
                </div>
                : <div>
                    <LoadSpinner/> 
                    <p className="Signature-Meal-p-f m-4">Please wait while we retrieve your food!</p>
                </div>
                }
            </div>
        }
        </div>
    )
}


export default SignatureMeal
