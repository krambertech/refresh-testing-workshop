import { useState } from "react";

export default function Counter({ initialValue = 0, min, max }) {
  const [count, setCount] = useState(min || initialValue);

  return (
    <div>
      <h3>Counter</h3>
      <button
        aria-label="decrement"
        disabled={min !== undefined && count <= min}
        onClick={() => setCount(count - 1)}
      >
        -
      </button>
      <span>Count: {count}</span>
      <button
        aria-label="increment"
        disabled={max !== undefined && count >= max}
        onClick={() => setCount(count + 1)}
      >
        +
      </button>
    </div>
  );
}
