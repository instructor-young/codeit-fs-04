import Button from "@/components/Button";
import Input from "@/components/Input";

function SignUpPage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center p-8">
      <form className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold">회원가입</h1>

        <Input label="이메일" name="email" type="email" required />
        <Input
          label="비밀번호"
          name="password"
          type="password"
          required
          helperText="비밀번호는 8글자 이상으로 입력해 주세요"
        />
        <Input
          label="비밀번호 확인"
          name="passwordConfirm"
          type="password"
          required
          helperText="비밀번호를 한 번 더 입력해 주세요"
        />

        <Button size="lg">회원가입하기</Button>
      </form>
    </main>
  );
}

export default SignUpPage;
