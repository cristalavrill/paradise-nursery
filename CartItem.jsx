import { useDispatch, useSelector } from "react-redux";

import {
  updateQuantity,
  removeItem,
} from "./CartSlice";

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  function totalQuantity() {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  }

  function totalAmount() {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }

  function totalCost(item) {
    return item.price * item.quantity;
  }

  function handleIncrease(item) {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  }

  function handleDecrease(item) {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  }

  function handleRemove(item) {
    dispatch(removeItem(item.id));
  }

  return (
    <div id="cart" className="cart-page">

      <nav className="navbar">
        <button
          onClick={onContinueShopping}
        >
          Inicio
        </button>

        <button
          onClick={onContinueShopping}
        >
          Plantas
        </button>

        <span>
          🛒 Carrito ({totalQuantity()})
        </span>
      </nav>

      <h1>Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">

          <p>
            Tu carrito está vacío.
          </p>

          <button
            onClick={onContinueShopping}
          >
            Continuar comprando
          </button>

        </div>
      ) : (
        <div className="cart-content">

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="cart-item"
            >

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-info">

                <h2>{item.name}</h2>

                <p>
                  Precio unitario: $
                  {item.price.toLocaleString()}
                </p>

                <p>
                  Cantidad: {item.quantity}
                </p>

                <p>
                  Total de esta planta: $
                  {totalCost(item).toLocaleString()}
                </p>

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      handleDecrease(item)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      handleIncrease(item)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  onClick={() =>
                    handleRemove(item)
                  }
                  className="remove-button"
                >
                  Eliminar
                </button>

              </div>

            </div>
          ))}

          <div className="cart-summary">

            <h2>
              Total de artículos:{" "}
              {totalQuantity()}
            </h2>

            <h2>
              Total del carrito: $
              {totalAmount().toLocaleString()}
            </h2>

            <button
              onClick={() =>
                alert("Próximamente")
              }
            >
              Pagar
            </button>

            <button
              onClick={onContinueShopping}
            >
              Continuar comprando
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default CartItem;
