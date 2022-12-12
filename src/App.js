import logo from "./logo.svg";
import "./App.css";
import Register from "./auth/Register";
import Login from "./auth/Login";
import { Route, Routes } from "react-router-dom";
import ProtectedRouter from "./auth/Protected";
import Home from "./auth/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRouter />}>
          <Route path="/home" element={<Home />} exact />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
