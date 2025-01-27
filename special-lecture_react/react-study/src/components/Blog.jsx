import { useEffect, useState } from "react";

function Blog() {
  const [posts, setPosts] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    async function loadPosts() {
      const response = await fetch(url);
      const data = await response.json();

      setPosts(data);
    }

    loadPosts();
  }, []);

  return (
    <div>
      <h2>블로그</h2>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
