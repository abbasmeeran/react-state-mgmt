import React from "react";
import { Link, NavLink } from "react-router-dom";

const activeLinkStyle = {
  color: "purple",
};

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink to="/prodcuts" activeStyle={activeLinkStyle}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/Cart" activeStyle={activeLinkStyle}>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/tictactoe" activeStyle={activeLinkStyle}>
              TicTacToe
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
