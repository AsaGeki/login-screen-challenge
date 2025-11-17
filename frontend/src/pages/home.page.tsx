import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/user/login");
    }
  }, []);
  return (
    <div>
      <h1>INDEX</h1>
      <p>Bem vindo ao Menu</p>
    </div>
  );
}

export default Home;
