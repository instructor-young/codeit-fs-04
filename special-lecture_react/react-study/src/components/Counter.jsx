import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(100);

  const handleClickPlus = () => {
    setCount(count + 1);
  };
  const handleClickMinus = () => {
    setCount(count - 1);
  };

  const is짝수 = count % 2 === 0 ? true : false;

  return (
    <div>
      <div className="text-3xl text-center text-red-400">{count}</div>
      <div>{is짝수 ? "짝수" : "홀수"}</div>

      <div className="text-center">
        <button
          onClick={handleClickMinus}
          className="bg-white border border-black w-10"
        >
          -
        </button>
        <button
          onClick={handleClickPlus}
          className="bg-white border border-black w-10"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default Counter;
