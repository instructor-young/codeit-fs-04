import api from "@/api";

async function HomePage() {
  const posts = await api.getPosts();

  return (
    <div>
      <h1>JSONPlaceholder</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
