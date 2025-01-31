"use client";

import api from "@/api";
import { useQuery } from "@tanstack/react-query";

function MyReviewsPage() {
  const { data: myReveiws } = useQuery({
    queryKey: ["myReviews"],
    queryFn: api.users.getMyReviews,
    initialData: [],
  });

  return (
    <div>
      {myReveiws.map((review) => (
        <div key={review.id}>
          <div>{review.content}</div>
          <br />
        </div>
      ))}
    </div>
  );
}

export default MyReviewsPage;
