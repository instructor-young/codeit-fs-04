"use client";

import api from "@/api";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

function SignUpPage() {
  const router = useRouter();
  const { mutate: signUp } = useMutation({
    mutationFn: api.users.signUp,
    onSuccess: () => {
      router.replace("/");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const nickname = e.target.nickname.value;
    const password = e.target.password.value;
    const passwordConfirm = e.target.passwordConfirm.value;

    if (!email) return alert("이메일을 입력해 주세요");
    if (!nickname) return alert("닉네임을 입력해 주세요");
    if (!password) return alert("비밀번호를 입력해 주세요");
    if (!passwordConfirm) return alert("비밀번호 확인을 입력해 주세요");
    if (password !== passwordConfirm)
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다");

    const data = { email, nickname, password };

    signUp(data);
  };

  return (
    <main className="h-[calc(100vh-80px)] flex flex-col items-center justify-center p-8">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
        <h1 className="text-3xl font-bold">회원가입</h1>

        <Input label="이메일" name="email" type="email" required />
        <Input label="닉네임" name="nickname" type="text" required />
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
