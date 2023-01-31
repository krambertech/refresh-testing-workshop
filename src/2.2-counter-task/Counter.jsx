import {useState} from "react";

export default function Counter({initialValue = 0, min, max}) {
    const [count, setCount] = useState(initialValue !== undefined ? initialValue : min);

    return (
        <div>
            <h3>Counter</h3>
            <button aria-label="decrement" onClick={() => setCount(count - 1)} disabled={count <= min}>
                -
            </button>
            <span>Count: {count}</span>
            <button aria-label="increment" onClick={() => setCount(count + 1)} disabled={count >= max}>
                +
            </button>
        </div>
    );
}
