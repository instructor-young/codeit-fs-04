"use client";

import { useParams } from "next/navigation";

function page() {
  const params = useParams();
  const productId = params.productId;

  return <div>{productId} 페이지</div>;
}

export default page;
