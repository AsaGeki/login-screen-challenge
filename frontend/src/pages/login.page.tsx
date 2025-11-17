import { useState } from "react";
import { api } from "../api/http";
import Input from "../components/input.component";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await api.post("/user/login", form);
    localStorage.setItem("token", response.data.token);

    navigate("/");
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <Input
          label="Senha"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit">Entrar</button>
      </form>

      <a href="http://localhost:5173/user/register">Registrar</a>

    </div>
  );
}
