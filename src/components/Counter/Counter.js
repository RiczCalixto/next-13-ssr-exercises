"use client";
import React from "react";
import Spinner from "../Spinner/Spinner.js";

function Counter() {
  const [count, setCount] = React.useState(null);

  React.useEffect(() => {
    const savedValue = window.localStorage.getItem("saved-count");

    if (savedValue === null) {
      return;
    }

    setCount(savedValue);
  }, [setCount]);

  React.useEffect(() => {
    window.localStorage.setItem("saved-count", count);
  }, [count]);

  return (
    <button className="count-btn" onClick={() => setCount(count + 1)}>
      Count: {count !== null ? count : <Spinner />}
    </button>
  );
}

export default Counter;
