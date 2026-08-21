import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Clock,
  CheckCircle,
  Search,
  Bell,
  Stethoscope,
} from "lucide-react";

import DoctorSidebar from "../components/DoctorSidebar";
import api from "../services/api";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [doctor, setDoctor] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "doctor") {
      navigate("/login");
      return;
    }

    setDoctor(user);

    loadQueue();

    const interval = setInterval(loadQueue, 5000);

    return () => clearInterval(interval);
  }, []);

  const loadQueue = async () => {
    try {
      const res = await api.get("/doctor/queue");
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/doctor/status/${id}`, { status });

      loadQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = patients.filter((p) =>
    p.patient_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <DoctorSidebar />

      <main className="flex-1 ml-72">

        <header className="bg-white px-8 py-5 flex justify-between items-center shadow-sm">

          <div>

            <h1 className="text-3xl font-bold">
              Welcome Dr. {doctor.name}
            </h1>

            <p className="text-gray-500">
              Manage today's consultations.
            </p>

          </div>

          <Bell className="text-gray-500" />

        </header>

        <div className="p-8">

          <div className="relative mb-6">

            <Search className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search patient..."
              className="w-full border rounded-xl pl-10 py-3"
            />

          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">

            <StatCard
              icon={Users}
              title="Today's Patients"
              value={patients.length}
            />

            <StatCard
              icon={Clock}
              title="Waiting"
              value={
                patients.filter((p) => p.status === "Pending").length
              }
            />

            <StatCard
              icon={CheckCircle}
              title="Completed"
              value={
                patients.filter((p) => p.status === "Completed").length
              }
            />

          </div>

          <div className="bg-white rounded-3xl shadow overflow-hidden">

            <div className="p-5 border-b">
              <h2 className="text-xl font-bold">
                Live Patient Queue
              </h2>
            </div>

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="p-4 text-left">OP No</th>

                  <th className="p-4 text-left">Patient</th>

                  <th className="p-4 text-left">Complaint</th>

                  <th className="p-4 text-left">Time</th>

                  <th className="p-4 text-left">Status</th>

                  <th className="p-4 text-left">Action</th>

                </tr>

              </thead>

              <tbody>

                {filtered.map((p) => (

                  <tr key={p.id} className="border-t">

                    <td className="p-4 font-semibold">
                      {p.op_number}
                    </td>

                    <td className="p-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={`https://ui-avatars.com/api/?name=${p.patient_name}&background=0D9488&color=fff`}
                          className="w-10 h-10 rounded-full"
                        />

                        <div>

                          <p className="font-semibold">
                            {p.patient_name}
                          </p>

                          <p className="text-sm text-gray-500">
                            {p.phone}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td className="p-4">
                      {p.chief_complaint}
                    </td>

                    <td className="p-4">
                      {p.appointment_time}
                    </td>

                    <td className="p-4">

                      <span
                        className={`px-3 py-1 rounded-full text-xs ${
                          p.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : p.status === "In Consultation"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {p.status}
                      </span>

                    </td>

                    <td className="p-4">

                      {p.status === "Pending" && (

                        <button
                          onClick={() =>
                            updateStatus(
                              p.id,
                              "In Consultation"
                            )
                          }
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                          Call Patient
                        </button>

                      )}

                      {p.status === "In Consultation" && (
  <button
    onClick={() => navigate(`/consultation/${p.id}`)}
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
  >
    Start Consultation
  </button>
)}

                    </td>

                  </tr>

                ))}

                {filtered.length === 0 && (

                  <tr>

                    <td
                      colSpan="6"
                      className="p-10 text-center text-gray-500"
                    >
                      No patients assigned today.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <Icon className="text-teal-600" size={34} />
      </div>
    </div>
  );
}