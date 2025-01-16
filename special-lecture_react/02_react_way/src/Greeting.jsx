import React, { useState } from "react";

function Greeting() {
  const [greeting, setGreeting] = useState(false);

  return (
    <>
      <button onClick={() => setGreeting(!greeting)}>인사하기</button>

      <div>안녕하세요?</div>
      <div>{greeting ? "네, 안녕하세요~!" : "안녕 못해요."}</div>
    </>
  );
}

export default Greeting;
