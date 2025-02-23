import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Logo from "../Logo/Logo";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <header className={styles.navbar}>
      <Logo />
      <nav>
        <ul>
          {!user ? (
            <>
              <li>
                <Link to="/login">Log in</Link>
              </li>
              <li>
                <Link to="/register">Registration</Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.userName}>{user.name}</li>
              <li>
                <Link to="/diary">Diary</Link>
              </li>
              <li>
                <Link to="/calculator">Calculator</Link>
              </li>
              <li>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Exit
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
