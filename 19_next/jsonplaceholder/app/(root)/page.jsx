import api from "@/api";
import Link from "next/link";

// ISR
// [링크](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
export const revalidate = 300;

async function HomePage() {
  const posts = await api.getPosts();

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
