import { Link } from "react-router-dom";
import logoIcon from "../../assets/logo-iconhealth.svg";
import logoSlim from "../../assets/logo-slim.svg";
import logoMom from "../../assets/logo-mom.svg";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <>
      <Link to="/" className={styles.logoContainer}>
        <img src={logoIcon} alt="Logo Icon" className={styles.logoIcon} />
        <img src={logoSlim} alt="Slim" className={styles.logoSlim} />
        <img src={logoMom} alt="Mom" className={styles.logoMom} />
      </Link>
    </>
  );
};
export default Logo;
