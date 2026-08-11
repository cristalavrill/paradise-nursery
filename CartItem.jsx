import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div id="cart">
      <nav>
        <a href="/">Inicio</a>{" "}
        <a href="#plants">Plantas</a>{" "}
        <a href="#cart">🛒 Carrito ({totalItems})</a>
      </nav>

      <h1>Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <div>
          <p>Tu carrito está vacío.</p>

          <a href="#plants">
            <button>Continuar comprando</button>
          </a>
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                width="150"
              />

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
                {(item.price * item.quantity).toLocaleString()}
              </p>

              <button
                onClick={() =>
                  dispatch(decreaseQuantity(item.id))
                }
                disabled={item.quantity === 1}
              >
                −
              </button>

              <span> {item.quantity} </span>

              <button
                onClick={() =>
                  dispatch(increaseQuantity(item.id))
                }
              >
                +
              </button>

              <button
                onClick={() =>
                  dispatch(removeFromCart(item.id))
                }
              >
                Eliminar
              </button>
            </div>
          ))}

          <h2>
            Total del carrito: $
            {total.toLocaleString()}
          </h2>

          <button
            onClick={() => alert("Próximamente")}
          >
            Pagar
          </button>

          <br />
          <br />

          <a href="#plants">
            <button>Continuar comprando</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default CartItem;
