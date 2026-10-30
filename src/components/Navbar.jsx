
import { NavLink } from "react-router";

function Navbar() {
  return (
    <header className="navbar">
      <NavLink className="logo" to="/">
        <span className="logo-icon">&lt;/&gt;</span>
        Code With <span>Thiru</span>
      </NavLink>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/problems">
          Problems
        </NavLink>

        <NavLink to="/dsa">
          DSA
        </NavLink>

        <NavLink to="/java">
          Java
        </NavLink>

        <NavLink to="/spring-boot">
          Spring Boot
        </NavLink>

        <NavLink to="/react">
          React
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
