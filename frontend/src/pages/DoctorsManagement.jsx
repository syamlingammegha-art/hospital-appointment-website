import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Stethoscope,
  Calendar,
  Trash2,
  Plus,
} from "lucide-react";
import api from "../services/api";

export default function DoctorsManagement() {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      console.log("Doctors:", res.data);
      setDoctors(res.data);
    } catch (err) {
      console.error("Doctor fetch error:", err);
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (err) {
      console.error(err);
      alert("Failed to delete doctor");
    }
  };

  const filtered = doctors.filter((doc) => {
    const q = search.toLowerCase();
    return (
      (doc.name || "").toLowerCase().includes(q) ||
      (doc.specialization || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/staff-dashboard")}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-xl"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <button
            onClick={() => navigate("/add-doctor")}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            Add Doctor
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-3xl shadow p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Doctors Management
          </h1>

          <div className="relative">
            <Search
              className="absolute left-3 top-3 text-gray-400"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search doctor..."
              className="w-full border rounded-xl pl-10 py-3"
            />
          </div>
        </div>

        {/* Doctor Cards */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-teal-600 to-cyan-600 h-28 flex justify-center items-end">
                  <img
                    src={
                      doc.photo
                        ? `http://localhost:5000${doc.photo}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            doc.name
                          )}&background=0D9488&color=fff&size=256`
                    }
                    alt={doc.name}
                    className="w-24 h-24 rounded-full border-4 border-white object-cover translate-y-10"
                  />
                </div>

                <div className="pt-14 p-6">
                  <h2 className="text-xl font-bold">
                    {doc.name}
                  </h2>

                  <p className="text-teal-600 font-medium">
                    {doc.specialization}
                  </p>

                  <div className="mt-5 space-y-3 text-sm text-slate-600">

                    <div className="flex items-center gap-2">
                      <Stethoscope size={18} />
                      {doc.specialization}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      {doc.available_days}
                    </div>

                    <div>
                      Experience: {doc.experience} years
                    </div>

                    <div>
                      Fee: ₹{doc.consultation_fee}
                    </div>

                    <div>
                      Status:
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          doc.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </div>

                  </div>

                  <button
                    onClick={() => deleteDoctor(doc.id)}
                    className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
                  >
                    <Trash2 size={18} />
                    Remove Doctor
                  </button>

                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-16 text-center shadow">
            <h2 className="text-2xl font-semibold">
              No doctors available
            </h2>

            <p className="text-slate-500 mt-2">
              Add doctors from the Add Doctor page.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}