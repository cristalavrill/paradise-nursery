import { useDispatch, useSelector } from "react-redux";
import {
  updateQuantity,
  removeItem,
} from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalQuantity = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  };

  const calculateTotalCost = (item) => {
    return item.price * item.quantity;
  };

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      })
    );
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  return (
    <div id="cart">
      <nav>
        <a href="/">Inicio</a>{" "}
        <a href="#plants">Plantas</a>{" "}
        <a href="#cart">
          🛒 Carrito ({totalQuantity()})
        </a>
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
                {calculateTotalCost(item).toLocaleString()}
              </p>

              <button
                onClick={() => handleDecrease(item)}
              >
                −
              </button>

              <span> {item.quantity} </span>

              <button
                onClick={() => handleIncrease(item)}
              >
                +
              </button>

              <button
                onClick={() => handleRemove(item)}
              >
                Eliminar
              </button>
            </div>
          ))}

          <h2>
            Total del carrito: $
            {calculateTotalAmount().toLocaleString()}
          </h2>

          <p>
            Total de artículos: {totalQuantity()}
          </p>

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
