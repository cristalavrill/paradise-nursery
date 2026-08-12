import { useState } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./CartSlice";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./src/components/AboutUs";
import "./App.css";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <Provider store={store}>
      {!showProductList && !showCart ? (
        <div className="home">
          <h1>Paradise Nursery</h1>

          <p>
            Tu tienda de plantas de interior
          </p>

          <button
            onClick={() => setShowProductList(true)}
          >
            Comenzar
          </button>
        </div>
      ) : showCart ? (
        <CartItem />
      ) : (
        <>
          <ProductList
            onViewCart={() => setShowCart(true)}
          />

          <AboutUs />
        </>
      )}
    </Provider>
  );
}

export default App;
