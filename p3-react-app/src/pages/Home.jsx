import { Link } from "react-router-dom"

function Home() {
    return (
        <div className="home-container">
            <h1>Shop smarter, not harder, Get it ordered</h1>
            <p>Save time, skip the lines. We've got you covered.</p>
            <Link to="products">Shop Now</Link>
        </div>
    )
}

export default Home