import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom"
import { getProducts } from "../../api";

function Products() {
  const [products, setProducts] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type")

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);

function handleFilterChange(key, value) {
  setSearchParams(prevParams => {
    if (value === null) {
      prevParams.delete(key)
    } else {
      prevParams.set(key, value)
    }
    return prevParams
  })
}

const filteredProducts = typeFilter
? products.filter(product => product.category === typeFilter)
: products;

const productElements = filteredProducts.map(product => (
  <div key={product.id}>
    <Link 
      to={`/products/${product.id}`}
      className="product-container"
      state={{
        search: `?${searchParams.toString()}`,
        type: typeFilter
      }}
    >
      <div className="product-img-container">
        <img src={product.image} alt={product.title}/>
      </div>
      <div className="product-attribute-container">
        <h3>{product.title}</h3>
        <p>${product.price}</p>
      </div>
    </Link>
  </div>
))

  return (
    <div className="product-list-container">
      <div className="product-list-filter-buttons">
        <button
            onClick={() => handleFilterChange("type", "electronics")}
            className={
                `electronics-type
                ${typeFilter === "electronics" ? "selected" : ""}`
            }
        >Electronics</button>
        <button
            onClick={() => handleFilterChange("type", "jewelery")}
            className={
                `jewelery-type
                ${typeFilter === "jewelery" ? "selected" : ""}`
            }
        >Jewelry</button>
        <button
            onClick={() => handleFilterChange("type", "men's clothing")}
            className={
                `men-clothing-type
                ${typeFilter === "men's clothing" ? "selected" : ""}`
            }
        >Men's Clothing</button>
        <button
            onClick={() => handleFilterChange("type", "women's clothing")}
            className={
                `women-clothing-type
                ${typeFilter === "women's clothing" ? "selected" : ""}`
            }
        >Women's Clothing</button>

      {typeFilter ? (
          <button
              onClick={() => handleFilterChange("type", null)}
              className="clear-filters"
          >Clear filter</button>
      ) : null}
      </div>
      <section className="products-container">
        {productElements}
      </section>
    </div>
  )
}

export default Products