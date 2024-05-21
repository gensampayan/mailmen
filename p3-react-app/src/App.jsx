import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/products/products";
import ProductDetail from "./pages/products/ProductDetail";
import Purchases from "./pages/purchases/Purchases";
import AuthRequired from "./components/AuthRequired";
import Login from "./pages/Login";
import { CartProvider } from "./state/CartContext";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="about-us" element={<About />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="login" element={<Login />}/>
              <Route element={<AuthRequired />}>
                <Route path="purchases" element={<Purchases />} />
              </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App;