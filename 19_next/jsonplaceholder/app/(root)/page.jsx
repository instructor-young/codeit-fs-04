import api from "@/api";
import Button from "@/components/Button";
import Link from "next/link";
import { PostsList, PostsListItem } from "./styled";

// ISR
// [링크](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
export const revalidate = 300;

async function HomePage() {
  const posts = await api.getPosts();

  return (
    <div>
      <Button size="sm" intent="primary">
        작은 버튼
      </Button>
      <Button size="md" intent="secondary">
        중간 버튼
      </Button>
      <Button size="lg" intent="danger">
        큰 버튼
      </Button>

      <PostsList>
        {posts.map((post, index) => (
          <PostsListItem key={post.id} isFive={(index + 1) % 5 === 0}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </PostsListItem>
        ))}
      </PostsList>
    </div>
  );
}

export default HomePage;
