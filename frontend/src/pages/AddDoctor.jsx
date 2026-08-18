import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function AddDoctor() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    specialization: "",
    experience: "",
    consultation_fee: "",
    available_days: "",
  });

  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (photo) {
        data.append("photo", photo);
      }

      await api.post("/doctors", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Doctor added successfully");
      navigate("/doctors-management");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add doctor");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Add Doctor</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Doctor Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              name="experience"
              placeholder="Experience (Years)"
              value={form.experience}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />

            <input
              type="number"
              name="consultation_fee"
              placeholder="Consultation Fee"
              value={form.consultation_fee}
              onChange={handleChange}
              className="border rounded-xl p-3"
              required
            />
          </div>

          <input
            name="available_days"
            placeholder="Available Days (Mon-Fri)"
            value={form.available_days}
            onChange={handleChange}
            className="w-full border rounded-xl p-3"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full border rounded-xl p-3"
          />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/doctors-management")}
              className="flex-1 border rounded-xl py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}