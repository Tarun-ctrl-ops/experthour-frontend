import { useState } from "react";
import { login } from "../api/userApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const token = await login({ email, password });
    localStorage.setItem("token", token);
    window.location.href = "/experts";
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: "auto" }}>
      <h2>Sign in</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}




