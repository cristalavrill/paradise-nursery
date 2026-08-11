import { useState } from "react";
import { Provider, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import "./App.css";

import cartReducer from "./CartSlice";
import ProductList from "./ProductList";
import CartItem from "./CartItem";
import AboutUs from "./src/components/AboutUs";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

function AppContent() {
  const [page, setPage] = useState("home");

  const totalItems = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  if (page === "plants") {
    return (
      <div>
        <button onClick={() => setPage("home")}>Inicio</button>
        <button onClick={() => setPage("cart")}>
          Carrito ({totalItems})
        </button>

        <ProductList />
      </div>
    );
  }

  if (page === "cart") {
    return (
      <div>
        <button onClick={() => setPage("plants")}>
          Continuar comprando
        </button>

        <CartItem />
      </div>
    );
  }

  return (
    <div className="home">
      <h1>Paradise Nursery</h1>

      <p>Tu tienda de plantas de interior</p>

      <button onClick={() => setPage("plants")}>
        Comenzar
      </button>

      <AboutUs />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
