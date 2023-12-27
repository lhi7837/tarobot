import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Main Page</Link>
          </li>
          <li>
            <Link to="/start">Start Page</Link>
          </li>
          <li>
            <button onClick={() => window.history.back()}>Back</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
