/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useCount } from "./hooks/useCount";

function Counter() {
  const { count, increment, decrement } = useCount();

  useEffect(() => {
    if (count % 5 === 0) console.log("5배수입니다", count);
  }, [count]);

  return (
    <div>
      <h2>카운트</h2>
      <div>{count}</div>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
      <hr />
    </div>
  );
}

export default React.memo(Counter);
