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

  return (
    <div>
      <h1>Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
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
                Total: $
                {(item.price * item.quantity).toLocaleString()}
              </p>

              <button
                onClick={() =>
                  dispatch(decreaseQuantity(item.id))
                }
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
            Total del carrito: ${total.toLocaleString()}
          </h2>

          <button onClick={() => alert("Próximamente")}>
            Pagar
          </button>

          <a href="#plants">
            <button>Continuar comprando</button>
          </a>
        </>
      )}
    </div>
  );
}

export default CartItem;
