"use client";

import api from "@/api";
import Page from "@/components/Page";
import { useEffect, useState } from "react";
import PostForm from "./_components/PostForm";
import PostList from "./_components/PostList";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePosts = async () => {
    try {
      setIsLoading(true);

      const posts = await api.getPosts();
      setPosts(posts);
    } catch (e) {
      setError("에러 발생...");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    updatePosts();
  }, []);

  return (
    <Page>
      <PostForm updatePosts={updatePosts} />

      <hr className="my-10" />

      {error || (
        <PostList
          isLoading={isLoading}
          posts={posts}
          updatePosts={updatePosts}
        />
      )}
    </Page>
  );
}

export default HomePage;
