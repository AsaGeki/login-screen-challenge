import { api } from "../api/http";

export async function register(data: {
  username: string;
  email: string;
  password: string;
}) {
  return api.post("/user/register", data);
}

export async function login(data: {
    username: string,
    password: string
}) {
    return api.post("/user/login", data)
}

export async function verifyEmail(token: string) {
    return api.post(`/verify/${token}`)
}