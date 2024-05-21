import { useEffect, useContext } from "react";
import CartContext from "../../state/CartContext";

function Purchases() {
  const { cart, dispatch } = useContext(CartContext)

  useEffect(() => {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem("itemsFromLocalStorage"));
    if (itemsFromLocalStorage && itemsFromLocalStorage.length > 0) {
      dispatch({ type: 'SET_CART', payload: itemsFromLocalStorage });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("itemsFromLocalStorage", JSON.stringify(cart));
  }, [cart]);

  return (
    <div>
      <div className="cart-container">
        <h1>Shopping Cart</h1>
        <p>You have {`${cart.length} product${cart.length !== 1 ? 's' : ''}`} in your cart.</p>
      </div>
      {cart.map(product => (
        <div key={product.id}>
          <div className="product-detail-container" tabIndex={product.id}>
            <div className="detail-img-container">
              <img src={product.image} alt={product.title}/>
            </div>
            <div className="detail-attribute-container">
              <h1>{product.title}</h1>
              <h2>{product.description}</h2>
              <p>${product.price}</p>
              <p>Rating: {product.rating?.rate}</p>
              <button className="remove-btn" onClick={() => dispatch({type: 'REMOVE_PRODUCT', payload: product.id})}>Remove</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Purchases;