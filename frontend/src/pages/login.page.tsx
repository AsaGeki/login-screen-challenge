import { useState } from "react";
import { api } from "../api/http";
import Input from "../components/input.component";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      if (res.status === 201 || res.status === 200) {
        localStorage.setItem("token", res.data.token);

        navigate("/index");
      } else {
        setError("Resposta inesperada do servidor.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao logar.");
    }
  }

  return (
    <div>
      <h1>Login</h1>
      {error && <div role="alert">{error}</div>}
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

      <a href="http://localhost:5173/register">Registrar</a>
    </div>
  );
}
