import React from 'react'
import {Link} from 'react-router-dom'
import HowItWorks from './products/HowItWorks'
import Reviews from './products/Reviews'
import './styles/Home.css'

const Home = () => {
    return (
        <main className="Home global-t-a col-md">
            <section className="Home-bg col-md">
                <div className="container">
                    <p className="Home-spacing">.</p>
                        <div className="Home-title">
                            <p className="Home-ourTitle">Hungry?</p>
                            <p className="Home-p">Having a hard time thinking of what to eat?</p>
                        </div>
                <div>
                    <p className="Home-p">
                        Save yourself the headache and have us pick out what to eat for you!
                    </p>
                </div>
                {/* get started button expands when hovered */}
                <Link className="btn btn-danger" to="/plans">Get Started!</Link>
                </div>
            </section>
                {/* Have the page scroll to buy or add to cart about pricing? */}

            <section className="mt-5">
                <HowItWorks/>
            </section>

            <section className="mt-5">
                <Reviews/>
            </section>
        </main>
    )
}

export default Home