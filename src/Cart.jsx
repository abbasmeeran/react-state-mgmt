import React from "react";
import useFetchAll from "./services/useFetchAll";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

export default function Cart({ cart, updateQuantity }) {
  const urls = cart.map((item) => `products/${item.id}`);
  const { data: products, error, loading } = useFetchAll(urls);
  const navigate = useNavigate();

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;

    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id, 10)
    );
    const { size } = skus.find((_sku) => _sku.sku === sku);

    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size}</p>
          <p>
            <select
              value={quantity}
              onChange={(e) =>
                updateQuantity(sku, parseInt(e.target.value, 10))
              }
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  const numberOfItemsInCart = cart.reduce(
    (total, current) => total + current.quantity,
    0
  );

  return (
    <section id="cart">
      <h1>Cart</h1>
      <h3>{`${numberOfItemsInCart} item${
        numberOfItemsInCart > 1 ? "s" : ""
      } in cart`}</h3>
      <ul>{cart.map(renderItem)}</ul>
      {numberOfItemsInCart > 0 && (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Checkout
        </button>
      )}
    </section>
  );
}
