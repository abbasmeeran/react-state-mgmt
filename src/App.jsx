import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";
import TicTacToe from "./tictactoe";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch (e) {
      console.log(e);
      return [];
    }
  });

  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart(id, sku, quantity) {
    setCart((items) => {
      const itemFound = items.find((i) => i.sku === sku);
      return itemFound
        ? items.map((i) =>
            i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...items, { id, sku, quantity: 1 }];
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity !== 0) {
        return items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
      } else {
        return items.filter((i) => i.sku !== sku);
      }
    });
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1>Welcome to Carved Rock Fitness</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/products/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} emptyCart={emptyCart} />}
            />
            <Route path="/tictactoe" element={<TicTacToe />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
