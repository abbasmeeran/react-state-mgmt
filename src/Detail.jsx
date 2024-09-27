import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = useState();

  const { data: product, loading, error } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) throw error;

  const { image, description, name, price, category, skus } = product;

  return (
    <div id="detail">
      <h1>{name}</h1>
      <p>{description}</p>
      <p id="price">${price}</p>
      <p>
        <select id="sku" value={sku} onChange={(e) => setSku(e.target.value)}>
          <option value="">Select..</option>
          {skus.map((s) => (
            <option value={s.sku}>{s.size}</option>
          ))}
        </select>
      </p>
      <p>
        <button
          className="btn btn-primary"
          onClick={() => {
            addToCart(id, sku);
            navigate("/cart");
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${image}`} alt={category} />
    </div>
  );
}
