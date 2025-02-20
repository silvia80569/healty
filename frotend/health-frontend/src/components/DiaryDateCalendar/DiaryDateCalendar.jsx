import { useState } from "react";
import styles from "./DiaryDateCalendar.module.css";

const DiaryDateCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  return (
    <div className={styles.calendarContainer}>
      <label htmlFor="date">Select Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className={styles.input}
      />
    </div>
  );
};

export default DiaryDateCalendar;
