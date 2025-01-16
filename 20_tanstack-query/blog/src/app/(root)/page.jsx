"use client";

import api from "@/api";
import Page from "@/components/Page";
import { useQuery } from "@tanstack/react-query";
import PostForm from "./_components/PostForm";
import PostList from "./_components/PostList";

function HomePage() {
  const {
    data: posts,
    isLoading,
    isError,
  } = useQuery({ queryFn: api.getPosts, queryKey: ["posts"] });

  return (
    <Page>
      <PostForm />

      <hr className="my-10" />

      {isError ? (
        "에러 발생..."
      ) : (
        <PostList isLoading={isLoading} posts={posts} />
      )}
    </Page>
  );
}

export default HomePage;
