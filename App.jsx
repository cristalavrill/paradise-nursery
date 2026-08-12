import { useState } from "react";
import "./App.css";
import ProductList from "./ProductList";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    return <ProductList />;
  }

  return (
    <div className="home">
      <h1>Paradise Nursery</h1>

      <p>
        Bienvenido a Paradise Nursery, tu tienda de plantas de interior.
      </p>

      <button onClick={() => setShowProductList(true)}>
        Comenzar
      </button>
    </div>
  );
}

export default App;
