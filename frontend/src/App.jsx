import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar";

import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <NavBar />
      <Outlet />
    </div>
  );
}

export default App;
