import { useState } from "react";
import { register } from "../api/userApi";

export default function UserPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    await register(form);
    alert("Account created. Please login.");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Join ExpertHour
      </h2>

      <form onSubmit={submit} className="space-y-4">
        {["name", "email", "password"].map((field) => (
          <input
            key={field}
            type={field === "password" ? "password" : "text"}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            className="w-full border px-4 py-2 rounded"
            value={form[field]}
            onChange={(e) =>
              setForm({ ...form, [field]: e.target.value })
            }
            required
          />
        ))}

        <button className="w-full bg-linkedin text-white py-2 rounded font-semibold">
          Sign Up
        </button>
      </form>
    </div>
  );
}



