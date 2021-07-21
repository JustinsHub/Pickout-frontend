import React, {useState} from 'react'
import Lottie from 'react-lottie'
import useLocalStorage from '../custom-hooks/useLocalStorage'
import Products from './foodApi'

const WineAddOn = ({wineRequest, clickNo, mealTitle, wineImage, addToCart}) => {
    const wineAddOnStorage = "pair-meal"
    const [wineDescription, setWineDescription] = useState(null)
    const [isClickedYes, setIsClickedYes] = useState(false)
    const [requestWine, setRequestWine] = useState(false)
    const [wineTitle, setWineTitle] = useState(null)
    const [winePrice, setWinePrice] = useState(null)
    const [wineId, setWineId] = useState(null)
    const [localWineAddOn, setLocalWineAddOn] = useLocalStorage(wineAddOnStorage)

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: require('../styles/logos/wineLoading.json'), // the path to the animation json
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    //prop passed down from SignatureMeal. It extracts the already shuffled array title and description to render in the component
    const wineAddOn = async() => {
        const res = await wineRequest()
        const wineResults = await Products.getPairMeal()
        const {id, price} = (process.env.REACT_APP_BASE_URL) ? wineResults.data : wineResults.data[0] 
        const {description, title} = res
        console.log(localWineAddOn)
        setTimeout(()=> {
        setWineDescription(description)
        setWineTitle(title)
        setWineId(id)
        setWinePrice(price)
        }, 4000)
        setRequestWine(true)
    }

    //this function only applies to this component only.
    //addToCart is a prop passed down from SignatureMeal (which only adds meal)
    //This function adds both meal and wine for pairing to localStorage to be in cart/checkout
    const wineAddOnCheckout = () =>{
        setLocalWineAddOn(JSON.stringify({wineId ,wineTitle, wineImage, winePrice}))
        addToCart()
    }

    //when clicked yes transitions for user to able to request to add wine with order
    const clickedYes = () => {
        setIsClickedYes((state) => !state)
    }

    //prop passed down from SignatureMeal to render UI/component properly
    const clickedNo = () => {
        clickNo((state) => !state)
    }
    
    //add a setTimeout for delay for loading... 
    return (
        <main>
            {requestWine ?
                <section className="">
                    <div className="card-body">
                        {/* if there is a wine description available then render button for checkout, else having a loading screen while requesting */}
                        {wineDescription ?
                        <div>
                            <p><b>{mealTitle}</b> goes well specifically with <b>{wineTitle}</b></p>
                            <p className="card-text">This wine is a {wineDescription}</p>
                            <div>
                                <button className="btn btn-default m-1" style={{color: "white"}} onClick={wineAddOnCheckout}>Add to cart</button>
                            </div>
                        </div>
                        :
                        <div>
                            <Lottie options={defaultOptions} height={200} width={200}/>
                            <p className="Signature-Meal-p-f">Please wait one moment while we pair your meal with delicious wine!</p>
                        </div>
                        }
                    </div>
                </section>
            :
            <section>
                {!isClickedYes ?
                <div>
                    <p>Before you add to cart, would you like wine to pair well with your meal?</p>
                    <button className="btn btn-default m-1" style={{color: "white"}} onClick={clickedYes}>Yes</button>
                    <button className="btn btn-secondary m-1" style={{color: "white"}} onClick={clickedNo}>No</button>
                </div>
                :
                <div>
                    <button className="btn btn-default m-1" style={{color: "white"}} onClick={wineAddOn}>Add on wine</button>
                </div>
                }
            </section>
            }
        </main>
    )
}

export default WineAddOn