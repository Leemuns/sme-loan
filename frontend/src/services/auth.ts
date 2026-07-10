import { UserCredentials } from "../types";

const baseUrl = "/api/auth";

const login = async (userCredentials: UserCredentials) => {
  const { username, password } = userCredentials;
  const res = await fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=password&username=${username}&password=${password}`,
  });
  if (!res.ok) throw new Error("Unable to login");
  return;
};

const logout = async () => {
  const res = await fetch(`${baseUrl}/logout`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to logout");
  return;
};

export default {
  login,
  logout,
};
