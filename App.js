import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import Chatbot from "./pages/Chatbot";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [page, setPage] = useState("dashboard");

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <div>


      <nav className="navbar navbar-dark bg-dark px-3">
        <span className="navbar-brand">Job Tracker</span>

        <div>
          <button
            className="btn btn-outline-light me-2"
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className="btn btn-outline-light me-2"
            onClick={() => setPage("add")}
          >
            Add Job
          </button>

          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              setToken(null);
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container mt-4">

        <div style={{ display: page === "dashboard" ? "block" : "none" }}>
          <Dashboard />
        </div>

        <div style={{ display: page === "add" ? "block" : "none" }}>
          <AddJob />
        </div>

      </div>


      <Chatbot />

    </div>
  );
}

export default App;