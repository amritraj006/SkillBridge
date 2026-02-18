import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

export default function Teacher() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ✅ Clerk teacher
  const { user } = useUser();
  const teacherId = user?.id; // clerk id

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    duration: "",
    totalSlots: 50,
    price: 0,
    thumbnailUrl: "",
    youtubeUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!teacherId) {
      setMsg("Teacher not logged in.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        createdBy: teacherId,
        totalSlots: Number(form.totalSlots),
        price: Number(form.price),
      };

      const res = await axios.post(`${backendUrl}/api/courses/create`, payload);

      setMsg(res.data.message || "Course created successfully!");

      // reset
      setForm({
        title: "",
        description: "",
        category: "",
        level: "Beginner",
        duration: "",
        totalSlots: 50,
        price: 0,
        thumbnailUrl: "",
        youtubeUrl: "",
      });
    } catch (error) {
      console.log(error);
      setMsg(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "20px" }}>
      <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
        Teacher - Create Course
      </h1>

      <p style={{ marginTop: "8px", color: "gray" }}>
        Your course will be <b>pending</b> until admin approves it.
      </p>

      {msg && (
        <p style={{ marginTop: "15px", fontWeight: "bold", color: "green" }}>
          {msg}
        </p>
      )}

      <form onSubmit={handleCreateCourse} style={{ marginTop: "20px" }}>
        <Input
          label="Title"
          name="title"
          value={form.title}
          onChange={handleChange}
        />

        <TextArea
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
        />

        <Input
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
        />

        <div style={{ marginBottom: "14px" }}>
          <label style={labelStyle}>Level</label>
          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <Input
          label="Duration (Example: 3 Weeks)"
          name="duration"
          value={form.duration}
          onChange={handleChange}
        />

        <Input
          label="Total Slots"
          name="totalSlots"
          value={form.totalSlots}
          onChange={handleChange}
        />

        <Input
          label="Price (₹)"
          name="price"
          value={form.price}
          onChange={handleChange}
        />

        <Input
          label="Thumbnail URL"
          name="thumbnailUrl"
          value={form.thumbnailUrl}
          onChange={handleChange}
        />

        <Input
          label="YouTube URL"
          name="youtubeUrl"
          value={form.youtubeUrl}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading ? "gray" : "black",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "10px",
          }}
        >
          {loading ? "Creating..." : "Create Course"}
        </button>
      </form>
    </div>
  );
}

/* ----------------- Small Components ----------------- */

function Input({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={labelStyle}>{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        style={inputStyle}
      />
    </div>
  );
}

function TextArea({ label, name, value, onChange }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        style={{ ...inputStyle, height: "90px" }}
      />
    </div>
  );
}

/* ---------------- Styles ---------------- */

const labelStyle = {
  display: "block",
  fontWeight: "bold",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
  outline: "none",
};