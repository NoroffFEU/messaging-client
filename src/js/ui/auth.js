import { login } from "../api/auth/index.js";

export async function authGuard() {
  if (localStorage.token) {
    return true;
  }

  const profile = JSON.parse(localStorage.getItem("profile"));
  const email = profile ? profile.email : prompt("Please enter your email address",  "");
  const password = prompt("Please enter your password (UNSAFE)");

  try {
    await login(email, password);
    alert("You are now logged in, redirecting to /inbox/");
    location.href = "/inbox/";
  } catch (error) {
    alert("Login failed, redirecting to /");
    location.href = "/";
    return false
  }
}