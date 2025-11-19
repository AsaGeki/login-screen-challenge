import { api } from "../api/http";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
}
function Home() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    api
      .get("/index")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  return (
    <div>
      <h1>INDEX</h1>
      <p>Bem vindo ao Menu</p>

      <h2>Usuários cadastrados</h2>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.id} - {u.username} - {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
