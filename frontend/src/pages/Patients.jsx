import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import api from "../services/api";

export default function Patients() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/users/patients");
      setPatients(res.data);
    } catch (err) {
      console.error("PATIENT FETCH ERROR:", err);
    }
  };

  const filtered = patients.filter((p) => {
    const query = search.toLowerCase();
    const name = (p.full_name || p.name || "").toLowerCase();
    const email = (p.email || "").toLowerCase();
    const phone = (p.phone || "").toLowerCase();
    const gender = (p.gender || "").toLowerCase();
    const age = String(p.age || "");

    return (
      name.includes(query) ||
      email.includes(query) ||
      phone.includes(query) ||
      gender.includes(query) ||
      age.includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate("/staff-dashboard")}
          className="mb-6 flex items-center gap-2 bg-teal-600 text-white px-5 py-2 rounded-xl hover:bg-teal-700"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="bg-white rounded-3xl shadow p-6 mb-6">
          <h1 className="text-3xl font-bold">Patients</h1>

          <div className="relative mt-5">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, phone, email..."
              className="w-full border rounded-xl pl-10 pr-4 py-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Age</th>
                <th className="p-4 text-left">Gender</th>
                <th className="p-4 text-left">Email</th>
              </tr>
            </thead>

            <tbody>
              {filtered.length > 0 ? (
                filtered.map((p) => (
                  <tr key={p.id} className="border-t hover:bg-slate-50">
                    <td className="p-4 font-semibold">
                      {p.full_name || p.name}
                    </td>

                    <td className="p-4">{p.phone || "-"}</td>
                    <td className="p-4">{p.age || "-"}</td>
                    <td className="p-4">{p.gender || "-"}</td>
                    <td className="p-4">{p.email || "-"}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-10 text-center text-slate-500">
                    No patients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}