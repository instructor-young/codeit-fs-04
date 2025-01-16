import Link from "next/link";

function PostList({ isLoading, posts }) {
  if (isLoading) return <span>로딩 중...</span>;

  return (
    <ul className="list-disc list-inside grid grid-cols-1 gap-y-4">
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="underline text-blue-500 underline-offset-1"
          >
            {post.title}
          </Link>

          <button className="ml-5 text-red-500">삭제</button>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
