import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home.page";
import Login from "./pages/login.page";
import Register from "./pages/register.page";
import PrivateRoute from "./routes/private.route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route
          path="/index"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
