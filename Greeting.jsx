import React, { useEffect, useState } from "react";

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ✅ Fetch Students from API with Pagination
  const fetchStudents = async (pageNumber = 1) => {
    try {
      const response = await fetch(`http://localhost:5000/api/students?page=${pageNumber}`);
      const data = await response.json();
      setStudents(data.students);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ✅ Delete Student Function
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await fetch(`http://localhost:5000/api/students/${id}`, {
          method: "DELETE",
        });
        fetchStudents(page); // Refresh same page after delete
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  useEffect(() => {
    fetchStudents(1);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Students List (Page {page} of {totalPages})</h1>

      {/* ✅ Add Student Button */}
      <button
        onClick={() => window.location.href = "/add-student"}
        style={{
          marginBottom: "10px",
          padding: "8px 15px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        + Add Student
      </button>

      {/* ✅ Table */}
      <table border="1" cellPadding="5" style={{ width: "100%", textAlign: "center" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th> {/* Edit/Delete Column */}
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.password}</td>
              <td>
                {/* ✅ Edit Button */}
                <button
                  onClick={() => window.location.href = `/edit-student/${student._id}`}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Edit
                </button>

                {/* ✅ Delete Button */}
                <button
                  onClick={() => handleDelete(student._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Pagination */}
      <button disabled={page === 1} onClick={() => fetchStudents(page - 1)}>
        Previous
      </button>
      <button disabled={page === totalPages} onClick={() => fetchStudents(page + 1)}>
        Next
      </button>
    </div>
  );
}
