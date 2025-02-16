import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "test@example.com" && password === "password") {
      const userData = { email, password };
      login(userData);
    } else {
      setError("Email sau parolă incorecte!");
    }
  };

  return (
    <div className={styles.login}>
      <h2 className={styles.title}>Log in</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.loginButton}>
            Log in
          </button>
          <button type="button" className={styles.registerButton}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
