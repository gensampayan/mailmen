import { Link } from "react-router-dom"

function About() {
  return (
    <section className="about-container">
      <h1>
        Welcome to UseHooks, where shopping smarter is made effortless. Our mission is to save you time and hassle while providing the convenience you deserve. 
      </h1>
      <p>
        Join us at UseHooks and experience a new way to shop.
      </p>
      <Link to="/products">Shop Now</Link>
    </section>
  )
}

export default About