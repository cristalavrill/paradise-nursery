import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./CartSlice";

const plants = [
  {
    id: 1,
    name: "Monstera",
    price: 45000,
    category: "Plantas de interior",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
  },
  {
    id: 2,
    name: "Pothos",
    price: 35000,
    category: "Plantas de interior",
    image:
      "https://images.unsplash.com/photo-1614594895304-fe7116ac3b68",
  },
  {
    id: 3,
    name: "Snake Plant",
    price: 40000,
    category: "Plantas de interior",
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee",
  },
  {
    id: 4,
    name: "Aloe Vera",
    price: 30000,
    category: "Suculentas",
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09",
  },
  {
    id: 5,
    name: "Echeveria",
    price: 25000,
    category: "Suculentas",
    image:
      "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc",
  },
  {
    id: 6,
    name: "Jade Plant",
    price: 28000,
    category: "Suculentas",
    image:
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09",
  },
  {
    id: 7,
    name: "Calathea",
    price: 50000,
    category: "Plantas tropicales",
    image:
      "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
  },
  {
    id: 8,
    name: "Peace Lily",
    price: 42000,
    category: "Plantas tropicales",
    image:
      "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee",
  },
  {
    id: 9,
    name: "Fiddle Leaf Fig",
    price: 55000,
    category: "Plantas tropicales",
    image:
      "https://images.unsplash.com/photo-1614594895304-fe7116ac3b68",
  },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const categories = [...new Set(plants.map((plant) => plant.category))];

  return (
    <div>
      <nav>
        <a href="/">Inicio</a>
        <a href="#plants">Plantas</a>
        <a href="#cart">Carrito ({totalItems})</a>
      </nav>

      <h1>Paradise Nursery</h1>

      {categories.map((category) => (
        <section key={category} id="plants">
          <h2>{category}</h2>

          <div>
            {plants
              .filter((plant) => plant.category === category)
              .map((plant) => {
                const alreadyAdded = cartItems.some(
                  (item) => item.id === plant.id
                );

                return (
                  <article key={plant.id}>
                    <img
                      src={plant.image}
                      alt={plant.name}
                      width="200"
                    />

                    <h3>{plant.name}</h3>

                    <p>${plant.price.toLocaleString()}</p>

                    <button
                      onClick={() => dispatch(addToCart(plant))}
                      disabled={alreadyAdded}
                    >
                      {alreadyAdded
                        ? "Agregado"
                        : "Agregar al Carrito"}
                    </button>
                  </article>
                );
              })}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ProductList;
