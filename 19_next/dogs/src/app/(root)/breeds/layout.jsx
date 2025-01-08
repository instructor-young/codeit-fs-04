"use client";

import { useState } from "react";

function BreedsLayout({ children }) {
  const [dogs, setDogs] = useState([]);

  return <div style={{ backgroundColor: "blueviolet" }}>{children}</div>;
}

export default BreedsLayout;
