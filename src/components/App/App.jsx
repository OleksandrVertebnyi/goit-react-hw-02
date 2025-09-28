import { useState } from "react";
import Description from "../Description/Description";
import Options from "../Options/Options";
import Feedback from "../Feedback/Feedback";
import Notification from "../Notification/Notification";
import styles from "./App.module.css";

export default function App() {
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem("feedback");
    return saved
      ? JSON.parse(saved)
      : { good: 0, neutral: 0, bad: 0 };
  });

  const total = feedback.good + feedback.neutral + feedback.bad;
  const positive = total > 0 ? Math.round((feedback.good / total) * 100) : 0;

  const updateFeedback = (type) => {
    setFeedback((prev) => {
      const updated = { ...prev, [type]: prev[type] + 1 };
      localStorage.setItem("feedback", JSON.stringify(updated));
      return updated;
    });
  };

  const resetFeedback = () => {
    const reset = { good: 0, neutral: 0, bad: 0 };
    setFeedback(reset);
    localStorage.setItem("feedback", JSON.stringify(reset));
  };

  return (
    <div className={styles.app}>
      <Description />

      <Options
        onLeaveFeedback={updateFeedback}
        onReset={resetFeedback}
        total={total}
      />

      {total > 0 ? (
        // <Feedback feedback={feedback} positive={positive} />
      <Feedback
      good={feedback.good}
      neutral={feedback.neutral}
      bad={feedback.bad}
      total={total}
      positive={positive}
/>

      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
}



