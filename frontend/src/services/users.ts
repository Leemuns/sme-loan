import { NewUser, User } from "../types";

const baseUrl = "/api/users";

const getMe = async (): Promise<User | null> => {
  const res = await fetch(`${baseUrl}/me`);
  if (res.status === 401) return null;
  if (!res.ok) throw new Error("No user found");
  return await res.json();
};

const signup = async (credentials: NewUser): Promise<User | null> => {
  const res = await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (res.status === 400) return null;
  if (!res.ok) throw new Error("Failed to sign up");
  return await res.json();
};

export default {
  getMe,
  signup,
};
