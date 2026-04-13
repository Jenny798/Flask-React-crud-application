import { useState } from "react";

export default function AddJob() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("Applied");

  const handleSubmit = async () => {
    await fetch("http://127.0.0.1:5000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ title, company, status })
    });

    alert("Job added!");
  };

  return (
    <div className="card p-4">
      <h4>Add Job</h4>

      <input
        className="form-control mb-2"
        placeholder="Job Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Company"
        onChange={(e) => setCompany(e.target.value)}
      />

      <select
        className="form-select mb-3"
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Applied</option>
        <option>Interview</option>
        <option>Rejected</option>
      </select>

      <button className="btn btn-success w-100" onClick={handleSubmit}>
        Add Job
      </button>
    </div>
  );
}