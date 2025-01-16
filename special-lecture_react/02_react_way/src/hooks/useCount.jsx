import { useState } from "react";

export function useCount() {
  const [count, setCount] = useState(1);
  const increment = () => setCount((count) => count + 1);
  const decrement = () => setCount((count) => count - 1);

  return { count, increment, decrement };
}
