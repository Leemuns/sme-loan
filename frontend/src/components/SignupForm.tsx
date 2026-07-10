"use client";

import { useState, type SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

import usersService from "@/services/users";

export default function ContactForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      await usersService.signup({ username, fullname, email, password });
      setUsername("");
      setPassword("");
      setEmail("");
      setFullname("");
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
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
      </div>
      <div>
        <label htmlFor="fullname">Full name:</label>
        <input
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Enter full name"
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}
