import { useState } from "react";
import axios from "axios";
import { setToken } from "../utils/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      email, password
    });
    setToken(res.data.token);
    alert("Logged in!");
  };

  return (
    <form onSubmit={login}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  );
}
