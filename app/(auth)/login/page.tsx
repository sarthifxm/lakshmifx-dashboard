"use client";

import { useState } from "react";
import { signInWithPassword } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await signInWithPassword(email, password);

      setMessage("Login successful");

      window.location.href = "/dashboard";
    } catch (err: any) {
      setMessage(err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-700">
        <h1 className="text-3xl font-bold text-center mb-6">
          LAKSHMIFX Login
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2 text-sm font-semibold">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-600 text-white focus:outline-none focus:border-white"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="w-full px-4 py-3 rounded-xl bg-black border border-zinc-600 text-white focus:outline-none focus:border-white"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-300 transition"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center font-medium text-white">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}