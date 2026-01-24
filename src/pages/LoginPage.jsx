import { useState } from "react";
import { login } from "../api/userApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const token = await login({ email, password });
    localStorage.setItem("token", token);
    alert("Logged in successfully");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Sign in
      </h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Email"
          className="w-full border px-4 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-4 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-linkedin text-white py-2 rounded font-semibold">
          Login
        </button>
      </form>
    </div>
  );
}



