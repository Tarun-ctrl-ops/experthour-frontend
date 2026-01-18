import { useState } from "react";
import { register, login } from "../api/userApi";

export default function UserPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const signup = async (e) => {
    e.preventDefault();
    await register({ name, email, password });
    alert("Registered. Now login.");
  };

  const signin = async () => {
    const res = await login({ email, password });
    localStorage.setItem("token", res.token);
    alert("Logged in");
  };


  return (
    <>
      <h2>Signup</h2>
      <form onSubmit={signup}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
        <button>Register</button>
      </form>

      <h2>Login</h2>
      <button onClick={signin}>Login</button>
    </>
  );
}
