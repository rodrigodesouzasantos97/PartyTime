import { NavLink } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav id="navbar">
      <NavLink to="/" className="title">Party Time!</NavLink>
      <ul>
        <li>
          <NavLink to="/">Minhas Festas</NavLink>
        </li>
        <li>
          <NavLink to="/party/new" className="btn">
            Criar Festa
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
