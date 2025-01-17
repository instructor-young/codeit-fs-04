import CreatePostForm from "./_components/CreatePostForm";
import LogInForm from "./_components/LogInForm";
import SignUpForm from "./_components/SignUpForm";

function HomePage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center">
      {/* 회원가입 양식 */}
      <SignUpForm />

      <hr className="w-full my-10 border-black" />

      <LogInForm />

      <hr className="w-full my-10 border-black" />

      <CreatePostForm />
    </main>
  );
}

export default HomePage;
