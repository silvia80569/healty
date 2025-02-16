import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  const { register, login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = { name, email, password };

    const registeredUser = await register(newUser);
    if (registeredUser) {
      login(registeredUser);
      navigate("/login");
    }
  };

  return (
    <div className={styles.registration}>
      <h2 className={styles.title}>Registration</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              console.log(name);
            }}
            className={styles.input}
            autoComplete="name"
          />
        </div>
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
            autoComplete="email"
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
            autoComplete="new-password"
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.registerButton}>
            Register
          </button>
          <button type="button" className={styles.loginButton}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
