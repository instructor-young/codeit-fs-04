"use client";

function SignUpForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = JSON.stringify({ email, password });
    const url = "http://localhost:3000/api/auth/sign-up";
    const method = "POST";
    const headers = { "Content-Type": "application/json" };

    const response = await fetch(url, { method, headers, body: data });
    const result = await response.json();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>회원가입하기</h2>
      <input
        name="email"
        className="border border-black"
        type="text"
        placeholder="email"
      />
      <input
        name="password"
        className="border border-black"
        type="text"
        placeholder="password"
      />
      <button className="border border-black">가입하기</button>
    </form>
  );
}

export default SignUpForm;
