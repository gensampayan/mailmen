import { useState, useEffect, useContext } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { getProduct } from "../../api"
import CartContext from "../../state/CartContext"

function ProductDetail() {
  const [product, setProduct] = useState(null)
  const [buttonClicked, setButtonClicked] = useState(false);
  const { id } = useParams()
  const location = useLocation()
  
  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await getProduct(id)
        setProduct(data)
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    loadProduct()
  }, [id])

  const search = location.state?.search || "";
  const type = location.state?.type || "products";
  const capitalizedType = type
  .split(" ")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

  const { dispatch } = useContext(CartContext)

  function handleAddToCart(product) {
    dispatch({type: 'ADD_PRODUCT', payload: product})
    setButtonClicked(true);
  }

  return (
    <div className="product-details-container">
      <Link
        to={`..${search}`}
        relative="path"
        className="back-button"
      >
        &larr; <span>Back to {capitalizedType}</span>
      </Link>
      {
        product && (
          <div className="product-detail-container" tabIndex={product}>
            <div className="detail-img-container">
              <img src={product.image} alt={product.title}/>
            </div>
            <div className="detail-attribute-container">
              <h1>{product.title}</h1>
              <h2>{product.description}</h2>
              <p>${product.price}</p>
              <p>Rating: {product.rating?.rate}</p>
                {!buttonClicked && ( 
                  <button className="add-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                )}            
              </div>
          </div>
        )
      }
    </div>
  )
}

export default ProductDetail