import React from 'react'

const QuestionSection = () =>{
    return (
    <>
        <div className="container">
            <h1 className="PriceAndPlans-t global-font">Frequently Asked Questions</h1>
            <div className="row m-5">
                <div className="col-md-6">
                    <h5 className="PriceAndPlans-sub global-font fw-bold" style={{textAlign: "left"}}>How much is Pickout?</h5>
                    <p className="global-font" style={{fontSize: '17px', textAlign: "left"}}>
                        Pickout is has the best FIXED prices on the market no matter what random meal you get! Our signature meal 
                        cost only $8.99. And if you pair that with our signature wine, it's only an extra $7.99! A total of $16.98 
                        for your whole meal!
                    </p>

                    <h5 className="PriceAndPlans-sub global-font fw-bold mt-5" style={{textAlign: "left"}}>When does Pickout deliver?</h5>
                    <p className="global-font" style={{fontSize: '17px', textAlign: "left"}}>
                        Once you create an account and make an order. Depending on the location, it takes 1-3 business days for your meal to arrive.
                        If you are close to a Pickout location, it will be there within 30 minutes. 
                    </p>

                    <h5 className="PriceAndPlans-sub global-font fw-bold mt-5" style={{textAlign: "left"}}>How does Pickout choose the food for customers?</h5>
                    <p className="global-font" style={{fontSize: '17px', textAlign: "left"}}>
                        We have a huge database of different variety of foods all around the world that goes through our well built system by our engineers
                        to have a perfectly random picked meal for you. 
                    </p>

                </div>
                <div className="col-md-6">
                    <h5 className="PriceAndPlans-sub global-font fw-bold" style={{textAlign: "left"}}>Where does Pickout source ingredients?</h5>
                    <p className="global-font" style={{fontSize: '17px', textAlign: "left"}}>
                        The quality and freshness of our ingredients are incredibly important to us, so we work directly with 
                        reputable suppliers that support sustainable practices and engage with artisanal purveyors and family-run farms for some of our 
                        specialty ingredients.
                    </p>

                    <h5 className="PriceAndPlans-sub global-font fw-bold mt-5" style={{textAlign: "left"}}>Is Pickout organic?</h5>
                    <p className="global-font" style={{fontSize: '17px', textAlign: "left"}}>
                        We’re committed to sending high-quality ingredients in every delivery and support farmers who use sustainable 
                        farming practices. All of our ingredients are non-GMO, a requirement of organically certified foods. 
                        However, our recipes are not certified USDA organic.
                    </p>

                    <h5 className="PriceAndPlans-sub global-font fw-bold mt-5" style={{textAlign: "left"}}>What's the plan for the future for Pickout?</h5>
                    <p className="global-font" style={{fontSize: '17px', textAlign: "left"}}>
                        To have it all finished to turn in as the last project for Springboard Software Engineering Career Track.
                    </p>
                </div>
            </div>
        </div>
    </>
    )
}

export default QuestionSection