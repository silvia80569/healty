import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <nav>
        <ul>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li>
            <Link to="/register">Registration</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
