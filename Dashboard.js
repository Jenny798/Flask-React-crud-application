import { useEffect, useState } from "react";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/jobs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const data = await res.json();
      setJobs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    await fetch(`http://127.0.0.1:5000/jobs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    fetchJobs();
  };

  const handleUpdate = async () => {
    await fetch(`http://127.0.0.1:5000/jobs/${editJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(editJob)
    });

    setEditJob(null);
    fetchJobs();
  };

  function getStatusBadge(status) {
    if (status === "Applied") return "badge bg-success";
    if (status === "Interview") return "badge bg-warning text-dark";
    if (status === "Rejected") return "badge bg-danger";
    return "badge bg-secondary";
  }

  return (
    <div>
      <h3 className="mb-4 text-center">📋 My Job Applications</h3>

      <div className="row">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.id}>
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body">

                  <h5 className="card-title">{job.title}</h5>
                  <p className="text-muted mb-2">{job.company}</p>

                  <span className={getStatusBadge(job.status)}>
                    {job.status}
                  </span>

                  <div className="mt-4 d-flex justify-content-between">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditJob(job)}
                    >
                      ✏ Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(job.id)}
                    >
                      🗑 Delete
                    </button>
                  </div>

                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No jobs added yet</p>
        )}
      </div>

      {/* EDIT MODAL */}
      {editJob && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-4">

              <h5 className="mb-3">Edit Job</h5>

              <input
                className="form-control mb-2"
                value={editJob.title}
                onChange={(e) =>
                  setEditJob({ ...editJob, title: e.target.value })
                }
              />

              <input
                className="form-control mb-2"
                value={editJob.company}
                onChange={(e) =>
                  setEditJob({ ...editJob, company: e.target.value })
                }
              />

              <select
                className="form-select mb-3"
                value={editJob.status}
                onChange={(e) =>
                  setEditJob({ ...editJob, status: e.target.value })
                }
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Rejected</option>
              </select>

              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => setEditJob(null)}
                >
                  Cancel
                </button>

                <button className="btn btn-success" onClick={handleUpdate}>
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}