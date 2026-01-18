import { useState } from "react";
import { login } from "../api/userApi";
import { setToken } from "../utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    localStorage.setItem("token", res.token);
    alert("Logged in!");
  };

  return (
    <form onSubmit={loginUser}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  );
}
