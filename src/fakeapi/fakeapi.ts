import { delay } from "@/lib/utils";

export async function login({ username, password }) {
  await delay(2000);

  return {
    token: "abcdef0123456789"
  };
}

export async function getMe({ token }) {
  await delay(2500);

  return {
    id: "1",
    name: "Hello",
    role: "user",
    age: 34
  };
}
