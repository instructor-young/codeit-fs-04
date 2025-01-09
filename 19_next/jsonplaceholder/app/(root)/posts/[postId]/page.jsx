import api from "@/api";

async function PostDetailPage(props) {
  const params = await props.params;
  const postId = params.postId;
  const post = await api.getPost(postId);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

export default PostDetailPage;
