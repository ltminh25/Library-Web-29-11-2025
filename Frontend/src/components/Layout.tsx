import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/reader/dashboard">Dashboard</Link></li>
            <li><Link to="/reader/books">Books</Link></li>
            <li><Link to="/reader/transactions">Transactions</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
