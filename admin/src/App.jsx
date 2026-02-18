import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // ✅ fetch pending courses
  const fetchPendingCourses = async () => {
    try {
      setLoading(true);
      setMsg("");

      const res = await axios.get(`${backendUrl}/api/courses/pending`);

      setPendingCourses(res.data.courses || []);
    } catch (error) {
      console.log(error);
      setMsg(error.response?.data?.message || "Failed to fetch pending courses");
    } finally {
      setLoading(false);
    }
  };

  // ✅ approve course
  const handleApprove = async (courseId) => {
    try {
      setMsg("");

      await axios.put(`${backendUrl}/api/courses/approve/${courseId}`);

      setMsg("✅ Course Approved Successfully!");

      // refresh pending list
      fetchPendingCourses();
    } catch (error) {
      console.log(error);
      setMsg(error.response?.data?.message || "Failed to approve course");
    }
  };

  useEffect(() => {
    fetchPendingCourses();
  }, []);

  return (
    <div style={{ maxWidth: "1100px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "30px", fontWeight: "bold" }}>
        Admin Dashboard
      </h1>

      <p style={{ marginTop: "8px", color: "gray" }}>
        Approve courses created by teachers
      </p>

      {msg && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}>
          {msg}
        </p>
      )}

      {loading ? (
        <h3 style={{ marginTop: "30px" }}>Loading pending courses...</h3>
      ) : pendingCourses.length === 0 ? (
        <h3 style={{ marginTop: "30px", color: "green" }}>
          🎉 No pending courses
        </h3>
      ) : (
        <div style={gridStyle}>
          {pendingCourses.map((course) => (
            <div key={course._id} style={cardStyle}>
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                style={imgStyle}
              />

              <h3 style={{ marginTop: "12px", fontSize: "18px" }}>
                {course.title}
              </h3>

              <p style={{ marginTop: "6px", color: "gray" }}>
                {course.category} • {course.level}
              </p>

              <p style={{ marginTop: "10px" }}>
                <b>Duration:</b> {course.duration}
              </p>

              <p style={{ marginTop: "6px" }}>
                <b>Price:</b> ₹{course.price}
              </p>

              <p style={{ marginTop: "6px" }}>
                <b>Teacher ID:</b> {course.createdBy}
              </p>

              <button
                onClick={() => handleApprove(course._id)}
                style={btnStyle}
              >
                ✅ Approve Course
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------- Styles ---------------- */

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
  gap: "18px",
  marginTop: "20px",
};

const cardStyle = {
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "15px",
  boxShadow: "0px 4px 10px rgba(0,0,0,0.08)",
};

const imgStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "10px",
};

const btnStyle = {
  width: "100%",
  marginTop: "15px",
  padding: "10px",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};