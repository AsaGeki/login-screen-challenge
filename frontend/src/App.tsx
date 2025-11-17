import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./pages/home.page";
import Login from "./pages/login.page";
import Register from "./pages/register.page";

function App() {
  return (
    <BrowserRouter>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/register" element={<Register />} />
        </Routes>
      </Router>
    </BrowserRouter>
  );
}

export default App;
