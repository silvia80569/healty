import PropTypes from "prop-types";
import styles from "./ErrorAlert.module.css";

const ErrorAlert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className={styles.errorAlert}>
      <div className={styles.errorAlertContent}>
        <p>{message}</p>
        <button onClick={onClose} className={styles.closeBtn}>
          X
        </button>
      </div>
    </div>
  );
};

ErrorAlert.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ErrorAlert;
