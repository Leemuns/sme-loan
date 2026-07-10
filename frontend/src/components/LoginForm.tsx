"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

import useLogin from "@/hooks/session/useLogin";

export default function ContactForm() {
  const router = useRouter();
  const login = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      login({ username, password });
      setUsername("");
      setPassword("");
      router.replace("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
