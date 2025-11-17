import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.page";
import Login from "./pages/login.page";
import Register from "./pages/register.page";
import PrivateRoute from "./routes/private.route";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/user"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
