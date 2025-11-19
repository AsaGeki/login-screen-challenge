import { useState } from "react";
import { api } from "../api/http";
import Input from "../components/input.component";
import { useNavigate } from "react-router-dom";

type RegisterForm = { username: string; email: string; password: string };

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!form.username || !form.email || !form.password) {
      setError("Preencha todos os campos.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/register", form);
      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      } else {
        setError("Resposta inesperada do servidor.");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Erro ao cadastrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Registrar</h1>
      {error && <div role="alert">{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuário"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          label="Senha"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
